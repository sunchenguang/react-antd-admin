
            >
                {level3menu}
              </SubMenu>
            );

          } else {
            const tmp = this.transFormMenuItem(level2, paths);
            paths.pop();
            return tmp;
          }
        });

        paths.pop();

        let level1Title;
        // 同样, 如果没有图标的话取第一个字
        if (level1.icon) {
          level1Title = <span><Icon type={level1.icon} /><span className="nav-text">{level1.name}</span></span>;
        } else {
          level1Title = <span><span className="invisible-nav-text">{level1.name[0]}</span><span
            className="nav-text"
          >{level1.name}</span></span>;
        }

        return (
          <SubMenu key={level1.key} title={level1Title}>
            {level2menu}
          </SubMenu>
        )
      }
      // 没有子菜单, 直接转换为MenuItem
      else {
        const tmp = this.transFormMenuItem(level1, paths, true);
        paths.pop();  // return之前别忘了pop
        return tmp;
      }
    });

    this.menu = menu;
    this.level1KeySet = level1KeySet;
    this.level2KeyMap = level2KeyMap;
  }

  // 我决定在class里面, 只有在碰到this问题时才使用箭头函数, 否则还是优先使用成员方法的形式定义函数
  // 因为用箭头函数ESlint总是提示语句最后少一个分号...
  // 事件处理的方法统一命名为handleXXX

  /**
   * 处理子菜单的展开事件
   *
   * @param openKeys
   */
  handleOpenChange = (openKeys) => {
    // 如果当前菜单是折叠状态, 就先展开
    if (this.props.collapse) {
      this.props.handleClickCollapse();
    }

    if (!globalConfig.sidebar.autoMenuSwitch) {  // 不开启这个功能
      this.setState({ openKeys });
      return;
    }

    logger.debug('old open keys: %o', openKeys);
    const newOpenKeys = [];

    // 有没有更优雅的写法
    let lastKey = '';  // 找到最近被点击的一个顶级菜单, 跟数组中元素的顺序有关
    for (let i = openKeys.length; i >= 0; i--) {
      if (this.level1KeySet.has(openKeys[i])) {
        lastKey = openKeys[i];
        break;
      }
    }
    // 过滤掉不在lastKey下面的所有子菜单
    for (const key of openKeys) {
      const ancestor = this.level2KeyMap.get(key);
      if (ancestor === lastKey) {
        newOpenKeys.push(key);
      }
    }
    newOpenKeys.push(lastKey);

    logger.debug('new open keys: %o', newOpenKeys);
    this.setState({ openKeys: newOpenKeys });
  };

  /**
   * 处理"叶子"节点的点击事件
   *
   * @param key
   */
  handleSelect = ({ key }) => {
    if (this.props.collapse) {
      this.props.handleClickCollapse();
    }
    // 如果是level1级别的菜单触发了这个事件, 说明这个菜单没有子项, 需要把其他所有submenu折叠
    if (globalConfig.sidebar.autoMenuSwitch && this.level1KeySet.has(key) && this.state.openKeys.length > 0) {
      this.setState({ openKeys: [] });
    }
  };

  render() {
    return (
      <aside className={this.props.collapse ? 'ant-layout-sidebar-collapse' : 'ant-layout-sidebar'}>
        <Logo collapse={this.props.collapse} />
        <Menu theme="dark" mode="inline"
          onOpenChange={this.handleOpenChange}
          onSelect={this.handleSelect}
          openKeys={this.props.collapse ? [] : this.state.openKeys}
    >
          {this.menu}
        </Menu>
        <div className="ant-layout-sidebar-trigger" onClick={this.props.handleClickCollapse}>
          <Icon type={this.props.collapse ? 'right' : 'left'} />
        </div>
      </aside>
    );
  }

}

// 什么时候使用箭头函数?
// 1. 碰到this问题的时候
// 2. 要写function关键字的时候

const mapStateToProps = (state) => {
  return {
    collapse: state.Sidebar.collapse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 所有处理事件的方法都以handleXXX命名
    handleClickCollapse: bindActionCreators(sidebarCollapseCreator, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
