/**
 * jQuery
 */
$(function (){
    var addGrid = function (t, options) {
        var p = $.extend({}, {
            expandFlag: '',
            expandDisableFlag: '',         //列表展开是否显示为禁用图标判断函数
            width: 'auto',                 //选择框宽度
            height: 'auto',                //选择框高度

            url: '',                       //表格数据后台请求地址
            list: 'list',                  //后台请求的数据列表名
            total: 'total',                //后台请求的数据总记录名
            params: {},                    //请求的参数

            header: true,                  //表格是否有表头，false不显示，true显示
            title: false,                  //表格是否有标题，false不显示，true显示
            pageBar: true,                 //表格是否有工具条，false不显示，true显示
            body: true,				       //表格是否有表格主体内容，false不显示，true显示
            toolBar: false,			       //表格是否有表格工具条，false不显示，true显示

            titleText: false,		       //表格的标题内容，string型
            title_cellspacing: '0',	       //title间隔
            header_cellspacing: '0',       //header间隔
            body_cellspacing: '0',	       //body间隔
            toolBar_cellspacing: '0',      //toolBar间隔
            overflow: true,                //是否启用滚动条
            titleModel:				       //表格的复杂标题内容模型
                [
                    [
                        {display: '电站名称', extend: {'id': '11'}, align: "center"},
                        {display: '电站名称', align: "center"},
                        {display: '电站名称', width: '0.1', align: "right"}
                    ]
                ],


            loadError: false,		       //数据请求失败的回调函数
            loadReady: false,		       //数据请求成功的回调函数

            data: false,				   //表格内所要填充的数据
            prototypeData: false, 			//原型数据 list:[] 数组
            prototypeSort: function (prop, sort) { // 默认排序方法
                return function (obj1, obj2) {
                    if (!prop || !sort) {
                        return 0;
                    }
                    var val1 = obj1[prop];
                    var val2 = obj2[prop];
                    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                        val1 = Number(val1);
                        val2 = Number(val2);
                    }
                    if (val1 < val2) {
                        return "desc" == sort.toLowerCase() ? 1 : -1;
                    } else if (val1 > val2) {
                        return "desc" == sort.toLowerCase() ? -1 : 1;
                    } else {
                        return 0;
                    }
                }
            },

            onSingleClick: false,	       //表格行点击事件
            onDoubleClick: false,	       //表格行双击事件
            onLoadReady: false,		       //表格主体内容加载完成的回调函数

            isShowSelect: true,            //是否显示选择操作列
            singleSelect: false, 	       //可多选还是单选，true单选，false多选
            isAllSelect: true,             //是否可全选（当 singleSelect = false 时有效）
            clickSelect: false,		       //行是否可以点击

            max_height: 'auto',		       //最大高度
            line_height: 40,		       //单行行高
            preColumnWidth: 180,		   //默认列宽度
            srcollWidth:5, 				   //默认滚动条宽度
            rp: 10,					       //表格当前每页可装载的记录条数
            rps: [5, 10, 15, 30, 50],	       //表格每页可装载的记录条数分配
            totalRecords: 0,		       //表格总记录数
            currentPage: 1,			       //表格当前页数
            totalPage: 1,			       //表格总页数
            toPage: 1,				       //表格要跳转的页数

            align: 'center',		       //默认排版类型

            colModel: null,			       //单行表头模型设置，使用方式与colModels类似

            resizable: true,		       //是否自适应变化
            columnFilter: false,           //展示列可设置，默认：false，表示全部显示，不可设置；数组，指定当前显示列的列名[name属性值数组]，如["name", "age"]

            parent: false,			       //父窗

            isShowNoData: false,           //是否在无数据时在表格中显示提示信息
            isRecordSelected: false,       //跨页选择
            isSearchRecordSelected: false, //是否在查询时记录选中项, isRecordSelected=true时生效
            showSelectedName: false,       //显示选中项展示板
            idProperty: false,             //主键（默认配置模型中的第一列）

            expand: false,                 //{Boolean | Function (record, box, index)} 是否可展开，如果这里是一个方法，那么展开时会执行该方法
            fold: false,                   //{Boolean | Function (box, index)} 配套expand参数使用，如果expand为true或者方法，在展开层收起来时会执行该方法
            expandIndex: null,             //初始展开行号，基数为 0，默认 初始时都不展开
            expandBoxHeight: 'auto',       //展开容器的高度，默认为: 行高（line-height)

            colModels:				       //多行表头模型设置
                [					       //实例
                    [
                        {display: '电站名称', name: '0', rowspan: '2', width: '0.2', align: "center"},
                        {display: '并网类型', name: '7', rowspan: '2', width: '0.1', align: "center"},
                        {display: '逆变器类型', name: '8', rowspan: '2', width: '0.1', align: "center"},
                        {
                            display: '工作票',
                            name: '',
                            colspan: '2',
                            width: '0.2',
                            align: "center",
                            before: false,
                            after: false,
                            order: true  // 是否支持该列排序
                        },
                        {display: '操作票', name: '', colspan: '2', width: '0.2', align: "center"},
                        {display: '缺陷', name: '', colspan: '2', width: '0.2', align: "center"}
                    ],
                    [
                        {display: '总数(个)', name: '1', width: '0.1', align: "center"},
                        {display: '平均处理时长(h)', name: '2', width: '0.1', align: "center"},
                        {display: '总数(个)', name: '3', width: '0.1', align: "center"},
                        {display: '平均处理时长(h)', name: '4', width: '0.1', align: "center"},
                        {
                            display: '总数(个)',
                            name: '5',
                            width: '0.1',
                            align: "center",
                            unit: '%',
                            css: {'color': 'blue', 'font-size': '15px'}
                        },
                        {display: '平均处理时长(h)', name: '6', width: '0.1', align: "center"}
                    ]
                ],
            leftContent:		           //表格左边分页工具条内容
                [
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.pageShowCount,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_0'
                    },
                    {
                        input: 'select',
                        type: 'select',
                        show: 'rps',
                        fix: false,
                        name: 'pselect',
                        ids: 'pselect_rps',
                        right: 6
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.emptyMsg,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_totalRecords'
                    }
                ],
            rightContent:		           //表格左边分页工具条内容
                [
                    {
                        input: 'span',
                        type: 'button',
                        show: '',
                        fix: true,
                        name: 'pbutton',
                        ids: 'pbutton_first',
                        width: 24,
                        height: 24,
                        left: 3,
                        right: 3
                    },
                    {
                        input: 'span',
                        type: 'button',
                        show: '',
                        fix: true,
                        name: 'pbutton',
                        ids: 'pbutton_previous',
                        width: 24,
                        height: 24,
                        left: 3,
                        right: 3
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: 'currentPage',
                        fix: false,
                        name: 'plabel_curPage',
                        ids: 'plabel_currentPage1',
                        width: 'auto'
                    },
                    {
                        input: 'span',
                        type: 'button',
                        show: '',
                        fix: true,
                        name: 'pbutton',
                        ids: 'pbutton_next',
                        width: 24,
                        height: 24,
                        left: 3,
                        right: 3
                    },
                    {
                        input: 'span',
                        type: 'button',
                        show: '',
                        fix: true,
                        name: 'pbutton',
                        ids: 'pbutton_last',
                        width: 24,
                        height: 24,
                        left: 3,
                        right: 10
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.beforePageText,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_3',
                        width: 15
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: 'currentPage',
                        fix: false,
                        name: 'plabel',
                        ids: 'plabel_currentPage2',
                        width: 'auto'
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.afterPageText,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_4',
                        width: 10
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: 'totalPage',
                        fix: false,
                        name: 'plabel',
                        ids: 'plabel_totalPage',
                        width: 'auto'
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.mPageText,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_5',
                        width: '20'
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.jumpTo,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_6',
                        width: 26,
                        left: 10
                    },
                    {
                        input: 'input',
                        type: 'text',
                        show: 'toPage',
                        fix: false,
                        name: 'ptext',
                        ids: 'ptext_toPage',
                        width: 26,
                        height: 26,
                        right: 3
                    },
                    {
                        input: 'label',
                        type: 'label',
                        show: Msg.gridParam.mPageText,
                        fix: true,
                        name: 'plabel',
                        ids: 'plabel_7',
                        width: 15
                    },
                    {
                        input: 'span',
                        type: 'button',
                        show: 'GO',
                        fix: true,
                        name: 'pbutton_jumpTo',
                        ids: 'pbutton_jumpTo',
                        width: 26,
                        height: 26
                    }
                ]
        }, options);

        /**
         * 函数集合
         */
        var g = {
            /**
             * 初始化ID变量信息
             */
            init: function () {
                g.p = p;
                if((main.getBrowser() && main.getBrowser().msie)){
                    p.srcollWidth = 20;
                }
                p.selectedRecords = [];
                p.indexMap = {};
                p.defaultColumnFilter = p.columnFilter;

                p.selector = $(t).attr('id') || (function () {
                    var id = new Date().getTime();
                    $(t).attr('id', id);

                    return id;
                })();
                p.wholeID = 'GridTable_' + p.selector;
                p.titleID = 'GridTableTitle_' + p.selector;
                p.headerID = 'GridTableHeader_' + p.selector;
                p.bodyID = 'GridTableBody_' + p.selector;
                p.pageBarID = 'GridTablePageBar' + p.selector;

                g.createwhole();

                $(t).resize(function () {
                    g.resize();
                });
                g.resize();
            },
            settingSroll:function(){
                var tablDivclass ="GridTableBodyDiv .wrapper";
                var tabs = $('.GridTableDiv');
                var srcollWidth = p.srcollWidth;
                if(tabs && tabs.length>0){
                    for(var i = 0; i< tabs.length; i++){
                        var tabChld = tabs[i];
                        if($(tabChld).find('.'+tablDivclass)){
                            var ow = tabChld.offsetWidth;
                            var tabDiv = $(tabChld).find('.'+tablDivclass);
                            if(tabDiv[0].scrollHeight >tabDiv[0].offsetHeight){
                                tabDiv.css("width",((ow+srcollWidth)/(ow+1))*100+"%");
                            }else{
                                tabDiv.css("width",((ow)/ow)*100+"%");
                            }
                        }
                    }
                }
            },
            /**
             * 数组复制函数
             */
            _arrayCopy: function (array) {
                var copy = null;
                if (array && array instanceof Array) {
                    copy = [];
                    if (array[0][0]) {
                        $.each(array, function () {
                            copy.push(this.concat());
                        });
                    } else {
                        copy = array.concat();
                    }
                }
                return copy;
            },
            /**
             * 父窗大小变化的回调函数
             */
            resize: function () {
                g.settingSroll();
                var w = g.getContentSize();
                if (!p.resizable) {
                    return;
                }
                p.body && g.resizeBox();
            },
            resizeBox: function () {
                setTimeout(function () {
                    if (p.resizable) {
                        $(t).find('table').filter(function (index, val) {
                            if (index < 2) {
                                var resizeDomList = $('>tbody>tr>.GridItem', $(val)).not('.lastItem, .noResize');
                                $.each(resizeDomList, function (i, t) {
                                    var w = $(t).attr('data-width');
                                    var rw = g.calWidth(w, p.col_num);
                                    $(t).width(rw);
                                    $(t).attr('width', rw);
                                });
                            }
                        });
                    }
                    if (p.pageBar) {
                        if (p.boxWidth < 678) {
                            $('.GridTableToolBarBodyLeft', $('#' + p.pageBarID)).hide();
                            if (p.boxWidth < 478) {
                                $('.GridTableToolBarBodyRight .plabel, .GridTableToolBarBodyRight .ptext, .GridTableToolBarBodyRight .pbutton_jumpTo', $('#' + p.pageBarID)).hide();
                            } else {
                                $('.GridTableToolBarBodyRight .plabel, .GridTableToolBarBodyRight .ptext, .GridTableToolBarBodyRight .pbutton_jumpTo', $('#' + p.pageBarID)).show();
                            }
                        } else {
                            $('.GridTableToolBarBodyLeft', $('#' + p.pageBarID)).show();
                            $('.GridTableToolBarBodyRight .plabel, .GridTableToolBarBodyRight .ptext, .GridTableToolBarBodyRight .pbutton_jumpTo', $('#' + p.pageBarID)).show();
                        }
                    }
                    if (!$('#' + p.bodyID + '>.wrapper').hasClass('autoHeightBody')) {
                        $('#' + p.bodyID + '>.wrapper').height(p.height - $('#' + p.headerID).height());
                    }
                }, 0);
            },
            /**
             * 获取父窗的宽度，当作改表格插件宽度
             */
            getBoxSize: function () {
                if (p.parent) {
                    return $('#' + p.parent).width();
                }
                var node = $(t), i = 0;
                while (!node.width() && i < 3) {
                    node = node.parent();
                    i++;
                }
                return node.width();
            },
            /**
             * 获取内容体的宽度
             */
            getContentSize: function () {
                var resultWidth;
                if (p.resizable) {
                    resultWidth = g.getBoxSize() - 1;
                } else {
                    var colNum = 0;
                    $.each(p.colModelCopy, function () {
                        if (!this.hide) {
                            colNum++;
                        }
                    });
                    colNum = p.columnFilter.length || p.col_num || colNum || 8;
                    resultWidth = Math.max(g.getBoxSize() - 1, p.preColumnWidth * colNum);
                }

                return resultWidth;
            },
            /**
             * 计算元素宽度
             * @param width 宽度表示值
             * @param cols 总列数
             * @returns {Number | *} 实际宽度值
             */
            calWidth: function (width, cols) {
                var resultWidth = g.getContentSize();
                (p.clickSelect && p.isShowSelect) && (resultWidth -= p.line_height);
                p.expand && (resultWidth -= p.line_height);
                if (width) {
                    if (width <= 1) {
                        if (cols) {
                            return Math.round(width * (resultWidth - p.col_num * 2 + cols / 2));
                        }
                        return Math.round(width * (resultWidth - p.col_num * 2));
                    }
                    else if ((width + "").indexOf('%') != -1) {
                        var index = (width + "").indexOf('%');
                        var w = width.substring(0, index - 1);
                        return Math.round((w * resultWidth) / 100);
                    }
                }
                else if (cols) {
                    return Math.round((resultWidth - p.col_num * 2) / cols - cols);
                }
                else {
                    return resultWidth;
                }
            },
            /**
             * 创建表格整体的DIV
             */
            createwhole: function () {
                // TODO
                if (p.colModel) {
                    p.colModelCopy = g._arrayCopy(p.colModel);
                } else {
                    g.resetColModel();
                }

                p.columnNames = [];
                p.col_num = 0;
                $.each(p.colModelCopy, function () {
                    if (!this.hide) {
                        p.columnNames.push({id: this.name, name: this.display, width: this.width, leaf: true});
                        p.col_num++;
                    }
                });

                p.boxWidth = g.getBoxSize();
                p.contentWidth = g.getContentSize();

                $(t).empty();

                var div = $("<div class='GridTableDiv' id='" + p.wholeID + "'/>");
                //div.css({'width': p.boxWidth});
                div.attr('resizable', p.resizable);
                !p.resizable && div.css({
                    'overflow-x': 'auto',
                    'overflow-y': 'hidden'
                });
                $(t).append(div);

                p.isRecordSelected && p.showSelectedName && g.createSelectedShowBox();
                p.title && g.createTitle();
                p.header && g.createHeader();
                p.body && g.createBody();
                if (p.pageBar) {
                    g.pageBar();
                    g.initEvents();
                }
                p.body && (p.data ? g.addData() : g.refreshPage());
            },
            /**
             * 创建表格选中项展示板
             */
            createSelectedShowBox: function () {
                var div = $('<ul></ul>').addClass('selectedShowBox');
                $('#' + p.selector).append(div);
            },
            /**
             * 创建表格标题
             */
            createTitle: function () {
                var div = $("<div class='GridTableTitleDiv' id='" + p.titleID + "'/>");
                div.css({'width': p.boxWidth, 'height': p.line_height});
                $('#' + p.selector).append(div);
                if (p.titleText) {
                    div.addClass('SingleTitle').html(p.titleText);
                    return;
                }
                var tableContent = $('<table width="100%" class="GridTableTitle" cellpadding="0" border="0"/>')
                    .attr('cellspacing', p.title_cellspacing);
                div.append(tableContent);
                if (p.titleModel) {
                    var trContent = $("<tr/>").css({'height': p.line_height});

                    tableContent.append(trContent);
                    if (p.titleModel[0]) {
                        g.createTitleLeft(trContent, p.titleModel[0]);
                    }
                    if (p.titleModel[1]) {
                        g.createTitleRight(trContent, p.titleModel[1]);
                    }
                }
            },
            /**
             * 创建表格标题左边内容
             */
            createTitleLeft: function (trContent, data) {
                var tdContent = $("<td style='text-align:left'; width='50%' class='GridTableTitleLeftTD'/>");
                trContent.append(tdContent);
                var tableContent = $('<table class="GridTableTitle" cellpadding="0" border="0"/>')
                    .attr('cellspacing', p.title_cellspacing);
                tdContent.append(tableContent);
                g.createTitleTR(tableContent, data);
            },
            /**
             * 创建表格标题右边内容
             */
            createTitleRight: function (trContent, data) {
                var tdContent = $("<td style='text-align:right' width='50%' class='GridTableTitleRightTD'/>");
                trContent.append(tdContent);
                var tableContent = $('<table class="GridTableTitle" cellpadding="0" border="0"/>')
                    .attr('cellspacing', p.title_cellspacing);
                tdContent.append(tableContent);
                g.createTitleTR(tableContent, data);
            },
            /**
             * 创建表格标题tr内容
             */
            createTitleTR: function (tableContent, data) {
                var trContent = $("<tr class='GridTableTitleTR'/>");
                $.each(data, function (i) {
                    var td = $('<td/>');
                    this.width && td.attr('width', g.calWidth(this.width));
                    var content = $("<div/>");
                    if (this.before) {
                        content.append(this.before.css({
                            'display': 'inline-block',
                            'vertical-align': 'middle',
                            'margin-right': '10px'
                        }));
                    }
                    content.append(this.display);
                    if (this.after) {
                        content.append(this.after.css({
                            'display': 'inline-block',
                            'vertical-align': 'middle',
                            'margin-left': '10px'
                        }));
                    }
                    td.append(content);
                    if (this.extend) {
                        for (var key in this.extend) {
                            if (this.extend.hasOwnProperty(key)) {
                                content.attr(key, this.extend[key]);
                            }
                        }
                    }
                    this.rowspan ? td.attr('rowspan', this.rowspan) : 0;
                    this.colspan ? td.attr('colspan', this.colspan) : 0;
                    this.css ? content.css(this.css) : 0;
                    this.fnClick ? content.click(this.fnClick) : 0;
                    this.hide ? content.hide() : 0;
                    this.content == '' ? content.html('') : 0;
                    this.align ? td.css('text-align', this.align) : td.css('text-align', p.align);
                    trContent.append(td);
                });
                tableContent.append(trContent);
            },
            /**
             * 创建表格表头div
             */
            createHeader: function () {
                var content = $('<div/>').addClass('wrapper');
                !p.resizable && content.css({'width': '100%'});
                $('#' + p.wholeID).append($("<div class='GridTableHeaderDiv' id='" + p.headerID + "'/>").append(content));
                g.createHeaderTable(content);

                p.columnFilter && g.createHeaderFilter();
            },
            /**
             * 创建表格表头table
             */
            createHeaderTable: function (div) {
                div.empty();
                var tableContent = $('<table class="GridTableHeader" width="100%" cellpadding="0" border="0"/>')
                    .attr('cellspacing', p.header_cellspacing);
                //if (p.resizable) {
                //    tableContent.css({"width": p.contentWidth});
                //}
                div.append(tableContent);

                if (p.colModel) {
                    p.col_num = g.createHeaderTR(tableContent, p.colModelCopy);
                    div.attr('singalLineHeaderTable', true);
                    p.singalLineHeaderTable = true;
                } else {
                    var rcols = 0;
                    p.col_num = p.colModelCopy.length;
                    div.attr('singalLineHeaderTable', false);
                    p.singalLineHeaderTable = false;
                    g.createMitlHeadeLayoutTR(tableContent, p.colModelCopy);
                    $.each(p.colModels, function () {
                        rcols = g.createHeaderTR(tableContent, this, rcols);
                    });
                }
            },

            /**
             * 创建列过滤器
             */
            createHeaderFilter: function () {
                /**
                 * 绘制列选项
                 * @param context
                 */
                var drawBox = function (context, data) {
                    var box = $('ul', context);
                    box.empty();

                    var item_all = $('<li>').addClass('filter-item');
                    var checkbox_all = $('<input type="checkbox">').attr('id', 'column_filter_all')
                        .attr('name', 'allOption');
                    item_all.append($('<label for="column_filter_all"/>').append(checkbox_all).append(Msg.all));
                    checkbox_all.click(function () {
                        $('.item :checkbox', box).prop('checked', !!this.checked);
                    });
                    box.append(item_all);

                    $.each(p.columnNames, function () {
                        var item = $('<li>').addClass('filter-item').addClass('item');
                        var checkbox = $('<input type="checkbox">').attr('id', 'item_' + this.id)
                            .attr('name', 'itemOptions').attr('value', this.id);

                        data.indexOf(this.id) != -1 && checkbox.prop('checked', true);

                        checkbox.click(function () {
                            checkbox_all.prop('checked', $('.item :checkbox', box).length == $('.item :checked', box).length);
                        });
                        item.append($('<label for="item_' + this.id + '"/>').append(checkbox).append(this.name));
                        box.append(item);
                    });
                    checkbox_all.prop('checked', $('.item :checkbox', box).length == $('.item :checked', box).length);
                };

                var settingContent = $('<div/>').addClass('GridTableColumnFilter');
                var settingBtn = $('<div/>').addClass('setting_button');
                var settingBox = $('<form/>').addClass('setting_box').hide();

                settingBox.append($('<h2>').text(Msg.gridParam.columnFilter));

                var defaultBtnBar = $('<div/>').addClass('default-button-bar');
                var defaultBtn = $('<button/>').attr('type', 'button').addClass('btn')
                    .text(Msg.gridParam.defaultSettings);

                // 事件 - 恢复默认按钮
                defaultBtn.click(function () {
                    drawBox(settingBox, p.defaultColumnFilter || p.columnFilter);
                });

                defaultBtnBar.append(defaultBtn);
                settingBox.append(defaultBtnBar);

                settingBox.append($('<ul/>'));

                var btnBar = $('<div/>').addClass('button-bar');
                var okBtn = $('<button/>').attr('type', 'button').addClass('btn').text(Msg.sure);
                var cancelBtn = $('<button/>').attr('type', 'button').addClass('btn').text(Msg.cancel);

                // 事件 - 确认按钮
                okBtn.click(function () {
                    var columns = [];
                    var sa = settingBox.serializeArray();
                    $.each(sa, function () {
                        if (this.name == 'itemOptions') {
                            columns.push(this.value);
                        }
                    });
                    if (columns.length <= 0) {
                        return App.alert(Msg.gridParam.selectOneLess);
                    }
                    p.columnFilter = columns;

                    g.createwhole();
                    settingBox.hide(250);
                });
                // 事件 - 取消按钮
                cancelBtn.click(function () {
                    settingBox.hide(250);
                });

                btnBar.append(okBtn).append(cancelBtn);

                settingBox.append(btnBar);

                // 事件 - 展开/收起设置面板
                settingBtn.click(function () {
                    drawBox(settingBox, p.columnFilter);
                    settingBox.toggle(250);
                });

                settingContent.append(settingBtn).append(settingBox);

                $('#' + p.selector).append(settingContent);
            },

            /**
             * 绘制多行表头布局行
             * @param tableContent
             * @param data
             * @returns {number}
             */
            createMitlHeadeLayoutTR: function (tableContent, data) {
                var trContent = $("<tr/>").addClass('tableLayoutLine');
                var rcols = 0;
                $.each(data, function () {
                    if (!this.hide) {
                        var counter = false;
                        if (p.columnFilter) {
                            if (p.columnFilter.indexOf(this.name) != -1) {
                                counter = true;
                            }
                        } else {
                            counter = true;
                        }
                        if (counter) {
                            rcols += (+this.colspan || 1);
                        }
                    }
                });
                if (p.clickSelect && p.isShowSelect) {
                    trContent.append(
                        $('<th/>').addClass('noResize').attr('width', p.line_height / 2).attr('height', 1)
                    );
                }
                if (p.expand) {
                    trContent.append(
                        $('<th/>').addClass('noResize').attr('width', p.line_height / 2).attr('height', 1)
                    );
                }

                $.each(data, function (i, t) {
                    var th = $('<th/>').addClass('GridItem').attr('data-width', t.width)
                        .attr('height', 1).attr('name', t.name);
                    th.attr('width', g.calWidth(t.width, rcols));

                    t.colspan ? th.attr('colspan', t.colspan) : 0;
                    if (t.hide || (p.columnFilter && p.columnFilter.indexOf(t.name) == -1)) {
                        th.hide();
                    }

                    trContent.append(th);
                });
                tableContent.append(trContent);
                return rcols;
            },

            /**
             * 创建表格表头行
             */
            createHeaderTR: function (tableContent, data, totalCols) {
                var trContent = $("<tr class='GridTableHeaderTH'/>");
                //if (p.clickSelect && !p.singleSelect && p.isAllSelect) trContent.attr('title', Msg.GridTable);
                if (p.isAllSelect) {
                    trContent.click(function () {
                        g.singleClickHeaderLine(trContent, false);
                    });
                    trContent.dblclick(function () {
                        g.doubleClickHeaderLine(trContent);
                    });
                }

                var shifting = 0;
                var rcols = 0, rrows = 0;
                $.each(data, function () {
                    if (!this.hide) {
                        var counter = false;
                        if (p.columnFilter) {
                            if (p.columnFilter.indexOf(this.name) != -1) {
                                counter = true;
                            }
                        } else {
                            counter = true;
                        }
                        if (counter) {
                            shifting++;
                            rcols += (+this.colspan || 1);
                            rrows < +this.rowspan && (rrows = this.rowspan);
                        }
                    }
                });

                if (!totalCols && (p.clickSelect && p.isShowSelect)) {
                    var th = $('<th/>').addClass('noResize').attr('rowspan', rrows)
                        .attr('width', p.line_height).attr('height', p.line_height).css('text-align', 'center');
                    var div = $('<div/>').css({'width': p.line_height, 'height': p.line_height});
                    var cthch;
                    if (p.singleSelect) {
                        cthch = $('<input type="radio" />')
                            .attr('name', p.selector + '_single_' + (p.idProperty || p.colModelCopy[0].name)).hide();
                    } else {
                        cthch = $('<input type="checkbox"/>');
                        !p.isAllSelect && cthch.hide();
                    }
                    var m = (p.line_height - 13) / 2;
                    cthch.css({'margin': m}).addClass('HeaderCheckBox')
                        .click(function () {
                            cthch[0].checked = !cthch[0].checked;
                        });
                    div.append(cthch);
                    th.append(div);
                    trContent.append(th);
                }
                if (!totalCols && p.expand) {
                    var th = $('<th/>').addClass('ExpandBox').addClass('noResize').attr('rowspan', rrows)
                        .attr('width', p.line_height).attr('height', p.line_height).css('text-align', 'center');
                    var div = $('<div/>').css({'width': p.line_height, 'height': p.line_height});
                    div.addClass('HeaderExpand');
                    th.append(div);
                    trContent.append(th);
                }

                $.each(data, function (i, t) {
                    var th = $('<th/>').addClass('GridItem').attr('data-width', t.width)
                        .attr('height', p.line_height).attr('name', t.name);
                    var content = $("<div/>");
                    totalCols -= (t.colspan || 1);
                    // TODO
                    var w = g.calWidth(t.width, rcols);
                    if (i != data.length - 1) {
                        th.attr('width', w);
                        //th.css('width', w);
                    } else {
                        p.resizable ? th.addClass('lastItem') : th.attr('width', w);
                        content.css({'width': '100%'});
                    }

                    if (t.before) {
                        content.append(t.before.css({
                            'display': 'inline-block',
                            'vertical-align': 'middle',
                            'margin-right': '10px'
                        }));
                    }
                    content.append(t.display);

                    if (t.after) {
                        content.append(t.after.css({
                            'display': 'inline-block',
                            'vertical-align': 'middle',
                            'margin-left': '10px'
                        }));
                    }

                    if (t.order) {
                        var sortBy = $('<i/>').addClass('sortBy');
                        sortBy.click(function (e) {
                            p.params['orderBy'] = t.name;
                            if ($(this).hasClass('asc')) {
                                $('.sortBy', tableContent).removeClass('asc desc');
                                $(this).removeClass('asc').addClass('desc');
                                p.params['sort'] = 'desc';
                            } else {
                                $('.sortBy', tableContent).removeClass('asc desc');
                                $(this).addClass('asc').removeClass('desc');
                                p.params['sort'] = 'asc';
                            }
                            g.refreshPage();
                            e.stopPropagation();
                        });
                        if (p.params && p.params['orderBy'] == t.name) {
                            sortBy.addClass(p.params['sort'] || 'asc');
                        }
                        content.append(sortBy);
                    }

                    th.append(content);
                    if (t.extend) {
                        for (var key in this.extend) {
                            if (t.extend.hasOwnProperty(key)) {
                                th.attr(key, t.extend[key]);
                            }
                        }
                    }
                    t.rowspan && th.attr('rowspan', t.rowspan);
                    t.colspan && th.attr('colspan', t.colspan);
                    t.content == '' && th.html('');
                    th.css('text-align', p.align);
                    if (t.hide || (p.columnFilter && p.columnFilter.indexOf(t.name) == -1)) {
                        th.addClass('hidden');
                    } else {
                        th.addClass('visibility');
                    }

                    trContent.append(th);
                });
                tableContent.append(trContent);
                return rcols;
            },
            /**
             * 复制json数据
             */
            clone: function (data) {
                var copy = {};
                for (var key in data) {
                    copy[key] = data[key];
                }
                return copy;
            },
            /**
             * 重新整理表头模型数据，去除合并单元格的影响
             */
            resetColModel: function () {
                var colModels = g._arrayCopy(p.colModels);
                $.each(colModels, function (i) {
                    for (var j = 0; ; j++) {
                        if (!colModels[i][j]) {
                            break;
                        }
                        if (colModels[i][j].colspan && !colModels[i][j].colCopy) {
                            var colspan = parseInt(colModels[i][j].colspan);
                            for (var k = j + 1; k < j + colspan; k++) {
                                var that = g.clone(colModels[i][j]);
                                that.colCopy = true;
                                colModels[i].splice(k, 0, that);
                            }
                            j += colspan - 1;
                        }
                    }
                });
                $.each(colModels, function (i) {
                    $.each(this, function (j) {
                        if (this.rowspan && !this.rowCopy) {
                            var rowspan = parseInt(this.rowspan);
                            for (var k = i + 1; k < colModels.length && k < i + rowspan; k++) {
                                var that = g.clone(this);
                                that.rowCopy = true;
                                colModels[k].splice(j, 0, that);
                            }
                        }
                    });
                });
                $.each(colModels, function (i) {
                    $.each(this, function (j) {
                        if (this.colspan && this.colCopy) {
                            colModels[i].splice(j, 1)
                        }
                    });
                });
                var max = 0;
                for (var i = 1; i < colModels.length; i++) {
                    if (colModels[i].length >= colModels[i - 1].length) {
                        max = i;
                    }
                }
                p.colModelCopy = colModels[max].concat();
            },
            /**
             * 创建表格主体
             */
            createBody: function () {
                var content = $('<div class="GridTableBodyDiv" id="' + p.bodyID + '" />');
                var div = $('<div/>').addClass('wrapper');
                !p.resizable && div.css({'width': p.contentWidth - 1});
                var tableContent = $('<table class="GridTableBody" width="100%" cellpadding="0" border="0"/>')
                    .attr('cellspacing', p.body_cellspacing);
                if (p.expand) {
                    tableContent.addClass("GridTableExpandBody");
                }
                //if (p.resizable) {
                //    tableContent.css({"width": p.contentWidth});
                //}
                var overflowY = 'auto';
                if (!p.overflow) {
                    overflowY = 'hidden';
                }
                p.max_height && div.css({
                    'max-height': p.max_height + 'px',
                    'overflow-y': (p.resizable ? overflowY : 'visible'),
                    'overflow-x': 'hidden'
                });
                if (p.height && p.height != 'auto') {
                    div.addClass('fixedHeightBody');
                    div.height(p.height - $('#' + p.selector + 'GridTableHeader').height());
                }

                div.append(tableContent);
                $('#' + p.wholeID).append(content.append(div));

                content.data(p.wholeID, g.createRowTemplate());
            },
            /**
             * 拓展列内容，实际上不显示，只是为了可以取到数据
             */
            expandColModel: function () {
                if (p.data.length > 0) {
                    if (!p.colModelCopy) {
                        p.colModelCopy = g._arrayCopy(p.colModel);
                    }
                    var d = p.data[0];
                    for (var key in d) {
                        if (d.hasOwnProperty(key)) {
                            var found = false;
                            for (var i = 0; i < p.colModelCopy.length; i++) {
                                if (p.colModelCopy[i].name == key) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) {
                                var line = {};
                                line.display = key;
                                line.name = key;
                                line.hide = true;
                                line.width = 0.1;
                                p.colModelCopy.unshift(line);
                            }
                        }
                    }
                }
            },

            /**
             * 自定义展开方式,
             */
            appendRow: function (index, dataList) {
                g.clearAppendRow();
                if (dataList.length <= 0) {
                    return;
                }
                g.createRows($(t).find("tr[index='" + index + "']"), dataList, "subset");
            },

            clearAppendRow: function () {
                $('#' + p.bodyID + '.GridTableBodyDiv tr[index="subset"]').each(function (i, row) {
                    var record = g.getData($(row));
                    g.map.remove(record[p.idProperty || p.colModelCopy[0].name]);
                    $(row).remove();
                });
                return true;
            },

            createRowTemplate: function () {
                var trContent = $("<tr/>").css({'height': p.line_height}).attr('index', '{{index}}');

                if (p.linePic) {
                    trContent.append($("<td/>").css('text-align', 'center'));
                }

                var shifting = 0;
                var rcols = 0;
                var colModel = p.colModelCopy;
                $.each(colModel, function (i) {
                    if (!this.hide) {
                        var counter = false;
                        if (p.columnFilter) {
                            if (p.columnFilter.indexOf(this.name) != -1) {
                                counter = true;
                            }
                        } else {
                            counter = true;
                        }
                        if (counter) {
                            rcols += (+this.colspan || 1);
                        } else {
                            shifting++;
                        }
                    }
                });
                if (p.clickSelect && p.isShowSelect) {
                    var td = $('<td/>').addClass('noResize')
                        .attr('width', p.line_height).attr('height', p.line_height).css('text-align', 'center');
                    var div = $('<div/>').css({
                        'width': p.line_height,
                        'height': p.line_height,
                        "position": "relative"
                    });
                    var cthch;
                    if (p.singleSelect) {
                        cthch = $('<input type="radio" />')
                            .attr('name', p.selector + '_single_' + (p.idProperty || p.colModelCopy[0].name));
                    } else {
                        cthch = $('<input type="checkbox"/>');
                    }
                    var m = (p.line_height - 13) / 2;
                    cthch.css({'margin': m}).addClass('BodyCheckBox');
                    var radioDiv = $("<div/>").css({
                        "position": "absolute",
                        "top": "0",
                        "left": "0",
                        "right": "0",
                        "bottom": "0"
                    });
                    div.append(radioDiv).append(cthch);
                    td.append(div);
                    trContent.append(td);
                }
                if (p.expand) {
                    var td = $('<td/>').addClass('noResize')
                        .attr('width', p.line_height).addClass('ExpandBox')
                        .attr('height', p.line_height).css('text-align', 'center');
                    var div = $('<div/>').css({
                        'width': p.line_height,
                        'height': p.line_height,
                        "position": "relative"
                    });
                    div.addClass('BodyExpand');
                    td.append(div);
                    trContent.append(td);
                }
                $.each(p.colModelCopy, function (i, t) {
                    var td = $("<td/>").addClass('GridItem').attr('data-width', t.width);
                    var div = $("<div/>").attr('name', t.name).addClass('BodyTdContent').attr('data-display', t.display).css({
                        'text-overflow': 'ellipsis',
                        'overflow': 'hidden',
                        'white-space': 'nowrap'
                    });

                    var w = g.calWidth(t.width, rcols);
                    if (i != p.colModelCopy.length - 1) { // TODO
                        td.attr('width', w);
                        //td.css('width', w);
                    } else {
                        p.resizable ? td.addClass('lastItem') : td.attr('width', w);
                        //div.css('width', '100%');
                    }

                    td.append(div);

                    t.css && div.css(t.css);
                    td.css('text-align', t.align || p.align);
                    if (t.type == 'image') {
                        td.html("<div class='trPicture'></div>");
                    }
                    if (t.hide || (p.columnFilter && p.columnFilter.indexOf(t.name) == -1)) {
                        td.addClass('hidden');
                    } else {
                        td.addClass('visibility');
                    }

                    trContent.append(td);
                });

                if (p.idProperty && $('.BodyTdContent[name="' + p.idProperty + '"]', trContent).length <= 0) {
                    trContent.before(
                        $("<td/>").addClass('GridItem hidden')
                            .append($("<div/>").attr('name', p.idProperty).addClass('BodyTdContent'))
                    );
                }

                return trContent.get(0).outerHTML;
            },

            createRow: function (record, index, type) {
                var trTemplate = $('#' + p.bodyID).data(p.wholeID);
                if (!trTemplate) return null;

                var trContent = $(trTemplate.replace(/\{\{(index)\}\}/g, index));

                trContent.addClass(index % 2 == 0 ? 'singleLine' : 'doubleLine');
                trContent.addClass('dataline');
                trContent.data('record', record);
                trContent.data('index', index);

                if (p.expand) {
                    var div = $('.BodyExpand', trContent);
                    var key = record[p.idProperty || p.colModelCopy[0].name];
                    if (key === undefined && (p.idProperty || p.colModelCopy[0].name))
                        key = eval('record.' + (p.idProperty || p.colModelCopy[0].name));
                    // TODO 1、当前行高亮， 2、刷新表格的响应和容器大小变化关系
                    div.click(function (e) {
                        if ($(this).hasClass('Disabled')) {
                            return;
                        }

                        if (p.expandIndex != null && p.expandIndex != undefined) {
                            var box = $(t).find("tr.child_" + p.expandIndex);
                            box.hasClass('expanded') && $.isFunction(p.fold) && p.fold(box, p.expandIndex);
                        }

                        $(this).parentsUntil('tr').parent().siblings('.child').removeClass('expanded');
                        $(this).parentsUntil('tr').parent().siblings('[index]').removeClass('intoExpand');
                        $(this).parentsUntil('tr').parent().siblings('[index]').find('.BodyExpand').removeClass('expanded');
                        if ($(this).hasClass('expanded')) {
                            p.expandIndex = null;
                            $(this).removeClass("expanded");
                            trContent.removeClass('intoExpand');
                            $(t).find("tr[index='child']").remove();
                            g.clearAppendRow();
                        } else {
                            p.expandIndex = key || index;
                            $(this).parentsUntil('tr').parent().siblings('.child_' + (key || index)).addClass('expanded');
                            $(this).addClass("expanded");
                            trContent.addClass('intoExpand');

                            var expandBox = $('div.expand-box', $(this).parentsUntil('tr').parent().siblings('.child_' + (key || index)));
                            $('div.expand-box', $(this).parentsUntil('tr').parent().siblings('.child')).empty();
                            g.clearAppendRow() && $.isFunction(p.expand) && p.expand(record, expandBox, index);
                        }
                        e.stopPropagation();
                    });
                    if (p.expandIndex == (key || index)) {
                        div.addClass('expanded');
                        trContent.addClass('intoExpand');
                    }
                    //如果没有expand按钮标记函数,或者函数判断当前行需要展开
                    if ($.isFunction(p.expandFlag) && !p.expandFlag(record)) {
                        div.remove();
                    }
                    //如果有expand按钮禁用标记函数,并且函数判断当前行需要禁用
                    if ($.isFunction(p.expandDisableFlag) && p.expandDisableFlag(record)) {
                        div.addClass('Disabled');
                    }
                }

                $.each(p.colModelCopy, function (i, t) {
                    var v = record[t.name];
                    if (v === undefined && t.name) v = eval('record.' + t.name);
                    var show = g.handleData(v) + g.handleData(this.unit);
                    var div = $('.BodyTdContent[name="' + t.name + '"]', trContent);

                    if (div.length == 0) return true;

                    div.html(show.replaceHTMLChar().replaceIllegalChar().replace(/「/g, '[').replace(/」/g, ']'));
                    div.parent().attr('title', show.replaceHTMLChar().replace(/「/g, '[').replace(/」/g, ']'));
                    div.attr('value', v);
                    div.data('value', v);

                    if (t.fnInit && $.isFunction(t.fnInit)) {
                        var cell = $('.BodyTdContent[name="' + t.name + '"][data-display="' + t.display + '"]', trContent);
                        cell.data('fnInit', t.fnInit);

                        var value = t.fnInit(cell, v, record, index, trContent);
                        if (value !== undefined) {
                            record[t.name] = value;
                            cell.attr('value', value);
                            cell.data('value', value);
                            cell.attr('title', value);
                            div.parent().attr('title',value);
                            trContent.data('record', record);
                            if (g.map.contains(record[p.idProperty || p.colModelCopy[0].name])) {
                                g.map.put(record[p.idProperty || p.colModelCopy[0].name], record);
                            }
                        }
                    }
                });

                trContent.click(function () {
                    g.singleClickBodyLine(trContent, false);
                });
                trContent.dblclick(function () {
                    g.doubleClickBodyLine(trContent, true);
                });
                if (p.clickSelect && p.isShowSelect) {
                    $('.BodyCheckBox', trContent).click(function () {
                        this.checked = !this.checked;
                    });
                }

                return trContent;
            },

            createRows: function (context, dataList, type) {
                //console.time('createRows');
                if(!g.indexMap || type != "subset") g.indexMap = {};
                var dfd = $.Deferred();
                $.each(dataList, function (i, t) {
                    var trContent = g.createRow(t, i);
                    if (trContent) {
                        if (type == "subset") {
                            $(trContent).attr("index", "subset");
                            $(trContent).removeClass('singleLine').removeClass('doubleLine');
                            $(trContent).addClass(i % 2 == 0 ? 'singleLine' : 'doubleLine');
                            /*动态判断是否需要显示checkbox
                             $.isFunction(p.checkboxFlag) && !p.checkboxFlag(this) && $(trContent).find(".noResize input[type='checkbox']").css("visibility","hidden");*/
                            context.after(trContent);
                        } else {
                            g.indexMap[t[p.idProperty]] = i;
                            context.append(trContent);
                            p.expand && context.append(g.createExpandBox(t, i));
                        }
                    }
                });
                dfd.resolve();
                //console.timeEnd('createRows');
                return dfd.promise();
            },

            /**
             * 添加表格主体内容单元格数据
             */
            addData: function () {
                //console.time('addData');
                g.expandColModel();
                var tableContent = $('table', '#' + p.bodyID).eq(0);
                tableContent.empty();

                var render = function () {
                    var dfd = $.Deferred();
                    if (p.data.length <= 0) {
                        if (p.isShowNoData) {
                            var trContent = $("<tr/>").css({'height': p.line_height});
                            trContent.append($("<td/>").attr('colspan', (p.clickSelect && p.isShowSelect) ? p.col_num + 1 : p.col_num)
                                .css('text-align', 'center').html(Msg.reportTool.table[8]));
                            tableContent.append(trContent);
                            $('#' + p.bodyID).css('margin-top', '-1px');
                        }
                        dfd.resolve();
                    } else {
                        if (p.overflow && p.data.length * p.line_height > p.max_height) {
                            $('#' + p.headerID + ' .wrapper').css({'width': "100%"});
                        }
                        !p.singalLineHeaderTable && g.createMitlHeadeLayoutTR(tableContent, p.colModelCopy);
                        g.createRows(tableContent, p.data).done(function () {
                            dfd.resolve();
                        });
                    }
                    return dfd.promise();
                }

                if (!p.data || !(p.data instanceof Array)) {
                    return;
                }
                render().done(function () {
                    g.resizeBox();
                    g.loadSuccess();

                    Menu.hasElementRight();

                    var htrs = $('#' + p.headerID).find('tr:not(.child)');
                    var btrs = $('#' + p.bodyID).find('tr:not(.child)');

                    if (p.onLoadReady) {
                        p.onLoadReady(p.data, btrs, htrs, p.totalRecords,g.indexMap);
                    }
                    if (p.isSearchRecordSelected || p.isRecordSelected) {
                        var num = 0;
                        var values = g.map.getKeys() || [];
                        for (var i = 0; i < p.data.length; i++) {
                            var v = p.data[i][p.idProperty || p.colModelCopy[0].name];
                            if (v === undefined && (p.idProperty || p.colModelCopy[0].name))
                                v = eval('p.data[i].' + (p.idProperty || p.colModelCopy[0].name));
                            if (values.contains(v)) {
                                $(btrs[i]).addClass('SelectedBodyLine');
                                p.isShowSelect && ($(btrs[i]).find('.BodyCheckBox')[0].checked = true);
                                num++;
                            }
                        }
                        if (num && num == p.data.length && !p.singleSelect) {
                            $(htrs).addClass('SelectedHeaderLine');
                            p.isShowSelect && ($(htrs).find('.HeaderCheckBox')[0].checked = true);
                        }
                    }
                    //console.timeEnd('addData');
                });
            },

            /**
             * 创建展开内容
             * @param record
             * @param i
             * @returns {*|jQuery}
             */
            createExpandBox: function (record, i) {
                var index = record[p.idProperty || p.colModelCopy[0].name];
                if (index === undefined && (p.idProperty || p.colModelCopy[0].name))
                    index = eval('record.' + (p.idProperty || p.colModelCopy[0].name));
                var trContent = $("<tr/>").addClass('child child_' + (index || i));
                var colspan = p.col_num + 1;
                (p.clickSelect && p.isShowSelect) && colspan++;
                var tdContent = $("<td/>").attr('colspan', colspan);
                var content = $("<div/>").addClass('expand-box').css({
                    'height': p.expandBoxHeight,
                    'min-height': p.line_height
                });

                tdContent.append(content);
                trContent.append(tdContent);

                if (p.expandIndex == (index || i)) {
                    trContent.addClass('expanded');
                    $.isFunction(p.expand) && p.expand(record, content, i);
                }

                return trContent;
            },
            /**
             * 对单元格数据进行特殊处理
             */
            handleData: function (data) {
                if (data == null) return '';
                return data;
            },
            /**
             * 单击表格头行的处理函数
             */
            singleClickHeaderLine: function (trContent, doubleClick) {
                if (!p.clickSelect || p.singleSelect) return;
                var checkbox = trContent.find('.HeaderCheckBox')[0];
                if (doubleClick) {
                    trContent.addClass('SelectedHeaderLine');
                    checkbox.checked = true;
                } else {
                    trContent.toggleClass('SelectedHeaderLine');
                    checkbox.checked = checkbox.checked ? false : true;
                }

                if (trContent.hasClass('SelectedHeaderLine')) {
                    $('#' + p.bodyID + '.GridTableBodyDiv tr:not(.child)').each(function (i, row) {
                        g.singleClickBodyLine($(row), true);
                    });
                } else {
                    $('#' + p.bodyID + '.GridTableBodyDiv tr:not(.child)').each(function (i, row) {
                        g.singleClickBodyLine($(row), false);
                    });
                }
            },
            /**
             * 双击表格头行的处理函数
             */
            doubleClickHeaderLine: function (trContent) {
                g.singleClickHeaderLine(trContent, true);
            },
            /**
             * 单击表格主体行的处理函数
             *
             * @param trContent 操作行
             * @param doubleClick 是否是双击操作
             */
            singleClickBodyLine: function (trContent, doubleClick) {
                if (!p.clickSelect) return;
                if (p.singleSelect) {
                    g.map.clear();
                    trContent.siblings().each(function (i, row) {
                        $(row).removeClass('SelectedBodyLine');
                    });
                }
                var checkbox = trContent.find('.BodyCheckBox')[0];
                if (checkbox) {
                    if (doubleClick) {
                        trContent.addClass('SelectedBodyLine');
                        checkbox.checked = true;
                    } else {
                        if (p.singleSelect) {
                            checkbox.checked = trContent.hasClass('SelectedBodyLine');
                        }
                        trContent.toggleClass('SelectedBodyLine', !checkbox.checked);
                        checkbox.checked = !checkbox.checked;
                    }
                } else {
                    trContent.toggleClass('SelectedBodyLine', !trContent.hasClass('SelectedBodyLine'));
                }
                if (p.onSingleClick) {
                    p.onSingleClick(trContent, g.getData(trContent), trContent.hasClass('SelectedBodyLine'));
                }
                g.storageSelected(trContent);
                if (!p.singleSelect) {
                    var htrs = $('#' + p.headerID).find('tr:not(.child)');
                    var btrs = $('#' + p.bodyID).find('tr td.noResize input.BodyCheckBox');
//                    	$('#' + p.bodyID).find('tr:not(.child)');
                    var bstrs = $('.SelectedBodyLine', $('#' + p.bodyID));
                    if (bstrs.length && bstrs.length == btrs.length) {
                        htrs.addClass('SelectedHeaderLine');
                        htrs.find('.HeaderCheckBox')[0].checked = true;
                    } else {
                        htrs.removeClass('SelectedHeaderLine');
                        htrs.find('.HeaderCheckBox')[0].checked = false;
                    }
                }
            },
            /**
             * 双击表格主体行的处理函数
             */
            doubleClickBodyLine: function (trContent) {
                g.singleClickBodyLine(trContent, true);
                if (p.onDoubleClick) {
                    p.onDoubleClick(trContent, g.getData(trContent), trContent.hasClass('SelectedBodyLine'));
                }
            },
            /**
             * 记录选中项
             * @param trContent 操作行
             */
            storageSelected: function (trContent) {
                var record = g.getData(trContent);
                if (trContent.hasClass('SelectedBodyLine')) {
                    g.map.put(record[p.idProperty || p.colModelCopy[0].name], record);
                }
                else {
                    g.map.remove(record[p.idProperty || p.colModelCopy[0].name]);
                }
                p.showSelectedName && g.refreshSelectedShowBox();
            },
            /**
             * 刷新选中项展示框
             */
            refreshSelectedShowBox: function () {
                $('.selectedShowBox', $(t)).empty();
                var values = g.map.getValues() || [];
                for (var i = 0; i < values.length; i++) {
                    var name = p.idProperty || p.colModelCopy[0].name;
                    var text = values[i][p.showSelectedName || name];
                    var key = values[i][name];

                    if (text) {
                        var item = $('<li>').attr('title', text);
                        item.append($('<div>').addClass('t').text(text));
                        item.append($('<div>x</div>').addClass('close').click((function (item, key) {
                            return (function () {
                                g.map.remove(key);
                                item.remove();
                                g.addData();
                            });
                        })(item, key)));
                        $('.selectedShowBox', $(t)).append(item);
                    }
                    if (i == values.length - 1) {
                        $('.selectedShowBox', $(t)).append('<div class="clear"></div>')
                    }
                }
            },
            /**
             * 选中项记录 JSON 数据 —— 类Map操作
             */
            map: {
                put: function (key, value) {
                    for (var i = 0; i < p.selectedRecords.length; i++) {
                        if (p.selectedRecords[i].key === key) {
                            p.selectedRecords[i].value = value;
                            return;
                        }
                    }
                    p.selectedRecords.push({'key': key, 'value': value});
                },
                remove: function (key) {
                    for (var i = 0; i < p.selectedRecords.length; i++) {
                        var v = p.selectedRecords.pop();
                        if (parseInt(v.key) === key) {
                            continue;
                        }
                        p.selectedRecords.unshift(v);
                    }
                },
                /**
                 * 是否包含指定 key 的元素
                 */
                contains: function (key) {
                    for (var i = 0; i < p.selectedRecords.length; i++) {
                        if (p.selectedRecords[i].key === key) {
                            return true;
                        }
                    }
                    return false;
                },
                getKeys: function () {
                    var resultArr = [];
                    for (var i = 0; i < p.selectedRecords.length; i++) {
                        var v = p.selectedRecords[i];
                        resultArr.push(v.key);
                    }
                    return resultArr;
                },
                getValues: function () {
                    var resultArr = [];
                    for (var i = 0; i < p.selectedRecords.length; i++) {
                        var v = p.selectedRecords[i];
                        resultArr.push(v.value);
                    }
                    return resultArr;
                },
                clear: function () {
                    p.selectedRecords = [];
                }
            },
            /**
             * 获取表格行的一行数据，返回json格式
             */
            getData: function (trContent) {
                var record = trContent.data('record') || {};
                trContent.find('.BodyTdContent').each(function () {
                    var value = $(this).data('value');
                    if (value !== undefined) {
                        record[$(this).attr('name')] = value;
                    }
                });
                return record;
            },
            /**
             * 设置单元格的值
             * @param cell 指定单元格
             * @param value 值
             */
            setCellData: function (cell, value) {
                var trContent = $(cell).parents('tr').eq(0);
                var name = $(cell).attr('name');
                var record = trContent.data('record') || {};

                var fnInit = $(cell).data('fnInit');
                if (fnInit && $.isFunction(fnInit)) {
                    fnInit($(cell), value, record, trContent.data('index'), trContent);
                }

                if (name) {
                    record[name] = value;
                    trContent.data('record', record);

                    if (g.map.contains(record[p.idProperty || p.colModelCopy[0].name])) {
                        g.map.put(record[p.idProperty || p.colModelCopy[0].name], record);
                    }
                }

                $(cell).data('value', value);

                return $(cell);
            },
            /**
             * 设置某行的值
             * @param cell 指定单元格
             * @param value 值
             */
            setRowData:function(record,np){
                var index = g.indexMap[record[p.idProperty]];
                if(!index && index!=0) return false;
                var trContent = $('#' + p.bodyID).find('tr[index=' + index + ']');
                $.each(p.colModel, function (i, t) {
                    var name = t.name;
                    if(np){
                        if(($.isArray(np) && $.inArray(name,np)>=0) || np==name){
                            return true;
                        }
                    }
                    var value = record[name];
                    var cell = trContent.find('.BodyTdContent[name="' + name + '"]').eq(0);
                    var fnInit = $(cell).data('fnInit');
                    if (fnInit && $.isFunction(fnInit)) {
                        fnInit($(cell), value, record, trContent.data('index'), trContent);
                    }
                    var oldValue = $(cell).data('value');
                    record[name] = value;
                    if(oldValue!=value){
                        $(cell).attr('value', value);
                        $(cell).data('value', value);
                        $(cell).parent('title',value);
                    }

                });
                trContent.data('record', record);
                if (g.map.contains(record[p.idProperty || p.colModelCopy[0].name])) {
                    g.map.put(record[p.idProperty || p.colModelCopy[0].name], record);
                }
                return trContent;
            },
            /**
             * 创建分页工具条
             */
            pageBar: function () {
                g.addToolBar();
            },
            /**
             * 添加表格分页工具条
             */
            addToolBar: function () {
                var barDiv = $("<div />");
                barDiv.attr("id", p.pageBarID);
                barDiv.attr("class", "PageToolBar");
                barDiv.css({'height': p.toolBarHeight});

                $('#' + p.selector).append(barDiv);
                p.toolBar == 'hide' ? barDiv.hide() : 0;
                g.addBarTable(barDiv);
            },
            /**
             * 添加表格分页工具条框架
             */
            addBarTable: function (barDiv) {
                var tableContent = $("<div/>").addClass('GridTableBarBody');
                barDiv.append(tableContent);
                g.addToolBarContent(tableContent, 'Left');
                g.addToolBarContent(tableContent, 'Right');
            },
            /**
             * 添加表格分页工具条中的具体内容
             */
            addToolBarContent: function (trBarContent, type) {
                var content = [];
                var align = '';
                if (type == 'Left') {
                    content = p.leftContent;
                    align = "left";
                } else if (type == 'Right') {
                    content = p.rightContent;
                    align = "right";
                }
                var pan = $('<p/>').css('float', align).addClass('GridTableToolBarBody' + type);
                $.each(content, function (index, d) {
                    var input = $("<" + d.input + " />");
                    d.name && input.attr('class', d.name);
                    pan.append(input);
                    d.ids && input.attr('id', p.pageBarID + d.ids);
                    if (d.type == 'label') {
                        if (d.fix) {
                            input.css({'white-space': 'nowrap', 'text-overflow': 'ellipsis'});
                            d.show && input.html(d.show);
                        } else {
                            d.show && input.html(p[this.show]);
                            input.attr('size', '4');
                        }
                    } else if (d.type == 'select') {
                        d.width && input.css({"width": d.width});
                        d.height && input.css({"height": d.height});
                        var data = p[d.show];
                        for (var i = 0; i < data.length; i++) {
                            var option = $("<option />");
                            input.append(option);
                            option.val(data[i]);
                            option.html(data[i])
                        }
                    } else if (d.type == 'text') {
                        d.width && input.css({"width": d.width});
                        d.height && input.css({
                            "height": d.height, "text-align": "center"
                        });
                        d.show && input.val(p[d.show]);
                    } else if (d.type == 'button') {
                        input.css({
                            'vertical-align': 'middle',
                            'display': 'inline-block'
                        }).addClass("pbutton_on");
                        d.show && input.val(p[d.show]);
                        d.width && input.css({"width": d.width});
                        d.height && input.css({"height": d.height});
                        var div = $("<div/>");
                        d.ids && div.attr("class", d.ids);
                        d.width && div.css({"width": '100%'});
                        d.height && div.css({"height": '100%'});
                        input.append(div.text(d.show));
                    }
                    d.left && input.before($("<label/>").css("width", d.left));
                    d.right && input.after($("<label/>").css("width", d.right));
                });
                trBarContent.append(pan);
            },
            /**
             * 添加表格分页工具条中的事件响应
             */
            initEvents: function () {
                $('#' + p.pageBarID + "pselect_rps").change(function (data) {
                    p.currentPage = 1;
                    p.rp = p.rps[data.delegateTarget.selectedIndex];
                    g.refreshPage();
                });
                $('#' + p.pageBarID + "pbutton_first").click(function () {
                    if (p.currentPage != 1) {
                        p.currentPage = 1;
                        g.refreshPage();
                    }
                });
                $('#' + p.pageBarID + "pbutton_previous").click(function () {
                    if (p.currentPage > 1) {
                        p.currentPage -= 1;
                        g.refreshPage();
                    }
                });
                $('#' + p.pageBarID + "pbutton_next").click(function () {
                    if (p.currentPage < p.totalPage) {
                        p.currentPage = parseInt(p.currentPage) + 1;
                        g.refreshPage();
                    }
                });
                $('#' + p.pageBarID + "pbutton_last").click(function () {
                    if (p.currentPage != p.totalPage) {
                        p.currentPage = p.totalPage;
                        g.refreshPage();
                    }
                });
                $('#' + p.pageBarID + "ptext_toPage").keydown(function (event) {
                    if (event.keyCode == 13) {
                        g.jumpToPage();
                    }
                });
                $('#' + p.pageBarID + "pbutton_jumpTo").click(function () {
                    g.jumpToPage();
                });
                g.initToolBarSelect();
            },
            /**
             * go按钮跳转函数
             */
            jumpToPage: function () {
                var reg = /^[0-9]*[1-9][0-9]*$/;
                var pageS = $('#' + p.pageBarID + "ptext_toPage").val();
                if (reg.test(pageS)) {
                    pageS = parseInt(pageS);
                    if (pageS < 1) {
                        pageS = 1;
                    } else if (pageS > p.totalPage) {
                        pageS = p.totalPage;
                    } else if (pageS == p.currentPage) {
                        return;
                    }
                } else {
                    $('#' + p.pageBarID + "ptext_toPage").val(p.currentPage);
                    return;
                }
                p.currentPage = pageS;
                g.refreshPage();
            },
            /**
             * 初始化表格分页工具条中的select数据
             */
            initToolBarSelect: function () {
                var index = p.rps.indexOf(p.rp);
                if (index > -1) {
                    $('#' + p.pageBarID + "pselect_rps" + ' option:eq(' + index + ')').attr('selected', 'true');
                } else {
                    p.rp = p.rps[0];
                }

            },
            /**
             * 刷新表格整体内容
             */
            refreshPage: function (f) {
                if (f || !p.isRecordSelected) {
                    g.map.clear();
                }
                g.changeToolBarButtonStstus();
                g.changeParams();
                $.each($('#' + p.headerID + ' .GridTableHeaderTH'), function (i) {
                    var input = $(this).find('input[type=checkbox]');
                    if (input.length > 0) {
                        input[0].checked = false;
                        $(this).removeClass('SelectedHeaderLine');
                    }
                });
                $('#' + p.pageBarID + "plabel_totalRecords").html(Msg.gridParam.procMsg);
                if (p.url) {
                    $.http.ajax(p.url, p.params, function (data) {
                        if (data.success) {
                            if (p.loadReady) {
                                data.data = p.loadReady(data.data) || data.data;
                            }
                            if (data.data) {
                                p.totalRecords = data.data[p.total] ? data.data[p.total] : 0;
                                p.data = data.data[p.list] ? data.data[p.list] : [];
                            } else {
                                $('#' + p.pageBarID + "plabel_totalRecords").html(Msg.gridParam.emptyMsg);
                                p.totalRecords = 0;
                                p.data = [];
                            }
                        } else {
                            $('#' + p.pageBarID + "plabel_totalRecords").html(Msg.gridParam.emptyMsg);
                            if (p.loadError) {
                                p.loadError(data.data);
                            }
                            p.totalRecords = 0;
                            p.data = 0;
                        }
                        g.addData();
                    }, function (data) {
                        $('#' + p.pageBarID + "plabel_totalRecords").html(Msg.gridParam.emptyMsg);
                        if (p.loadError) {
                            p.loadError(data.data || data);
                        }
                        p.totalRecords = 0;
                        p.data = [];
                        g.addData();
                    });
                } else if (p.prototypeData) {
                    var temp = {};
                    temp.list = p.prototypeData.slice();
                    temp.total = temp.list.length;
                    var data = {};
                    data.data = temp;
                    if (data.data) {
                        if (p.loadReady) {
                            data.data = p.loadReady(data.data) || data.data;
                        }
                        p.totalRecords = data.data[p.total] ? data.data[p.total] : 0;
                        p.data = data.data[p.list] ? data.data[p.list] : [];
                    } else {
                        $('#' + p.pageBarID + "plabel_totalRecords").html(Msg.gridParam.emptyMsg);
                        p.totalRecords = 0;
                        p.data = [];
                    }
                    if (p.prototypeSort && $.isFunction(p.prototypeSort)) {
                        p.data.sort(p.prototypeSort(p.params['orderBy'], p.params['sort']))
                    }
                    p.data = p.data.slice((p.currentPage - 1) * p.rp, p.rp * p.currentPage);
                    g.addData();
                } else {
                    setTimeout(function () {
                        if (p.totalRecords == 0) {
                            $('#' + p.pageBarID + "plabel_totalRecords").html(Msg.gridParam.emptyMsg);
                        } else {
                            $('#' + p.pageBarID + "plabel_totalRecords")
                                .html(String.format(Msg.gridParam.displayMsg, p.totalRecords));
                        }
                    }, 100);
                }
            },
            /**
             * 后台数据获取成功，的回调函数
             */
            loadSuccess: function () {
                p.totalPage = Math.ceil(p.totalRecords / p.rp);
                p.totalPage = p.totalPage ? p.totalPage : 1;
                g.changeToolBarButtonStstus();
                $('#' + p.pageBarID + "plabel_currentPage1").html(p.currentPage);
                $('#' + p.pageBarID + "plabel_currentPage2").html(p.currentPage);
                $('#' + p.pageBarID + "plabel_totalPage").html(p.totalPage);
                $('#' + p.pageBarID + "ptext_toPage").val(p.currentPage);
                if (p.totalRecords == 0) {
                    $('#' + p.pageBarID + "plabel_totalRecords").html('无记录');
                } else {
                    $('#' + p.pageBarID + "plabel_totalRecords")
                        .html(String.format('共多少页', p.totalRecords));
                }
            },
            /**
             * 根据当前页和总页数改变工具条按钮状态
             */
            changeToolBarButtonStstus: function () {
                $(".pbutton", "#" + p.pageBarID).addClass("pbutton_on");
                $(".pbutton", "#" + p.pageBarID).removeClass("pbutton_dis");
                if (p.currentPage == 1) {
                    $('#' + p.pageBarID + "pbutton_first").removeClass("pbutton_on").addClass("pbutton_dis");
                    $('#' + p.pageBarID + "pbutton_previous").removeClass("pbutton_on").addClass("pbutton_dis");
                }
                if (p.currentPage == p.totalPage) {
                    $('#' + p.pageBarID + "pbutton_next").removeClass("pbutton_on").addClass("pbutton_dis");
                    $('#' + p.pageBarID + "pbutton_last").removeClass("pbutton_on").addClass("pbutton_dis");
                }
            },
            /**
             * 每次刷新前修改参数内容
             */
            changeParams: function () {
                p.params.page = p.currentPage;
                p.params.pageSize = p.rp;
            }
        };

        g.init();
        t.grid = g;
        t.p = p;
        return true;
    };

    var docLoaded = false;
    $(document).ready(function () {
        docLoaded = true;
    });

    $.fn.extend({
        /**
         * 绘制/初始化 表格
         */
        GridTable: function (p) {
            return this.each(function () {
                if (!docLoaded) {
                    $(this).hide();
                    var t = this;
                    $(document).ready(function () {
                        addGrid(t, p);
                    });
                } else {
                    addGrid(this, p);
                }
            });
        },

        /**
         * 扩展结点查询事件
         */
        GridTableSearch: function (p) {
            return this.each(function () {
                if (this.grid) {
                    this.p = $.extend(this.p, p);
                    this.p.currentPage = 1;
                    p && p.data ? this.grid.addData() : this.grid.refreshPage(!this.p.isSearchRecordSelected);
                }
            });
        },

        GridTableSearchpData : function(p){
            return this.each(function () {
                if (this.grid) {
                    this.p = $.extend(this.p, p);
                    this.p.currentPage = 1;
                    this.grid.addData();
                }
            });
        },

        /**
         * 获取选中记录的JSON原型格式
         */
        GridTableSelectedRecords: function () {
            var records = [];
            if (this[0] && this[0].grid)
                records = this[0].grid.map.getValues();
            return records;
        },

        /**
         * 初始化选中记录
         */
        GridTableInitSelectedRecords: function (records) {
            return this.each(function (i, g) {
                if (g && g.grid && records) {
                    $.each(records, function (n, t) {
                        g.grid.map.put(t[g.p.idProperty || g.p.colModel[0].name], t);
                    });
                    g.grid.refreshSelectedShowBox();
                    //g.grid.addData();
                }
            });
        },

        /**
         * 刷新表格
         */
        GridTableReload: function (p) {
            return this.each(function () {
                if (this.grid && p) $.extend(this.p, p);
                this.p.totalRecords = 0,
                    this.p.currentPage = 1,
                    this.p.totalPage = 1,
                    this.p.toPage = 1,
                    this.grid.refreshPage(true, true);
            });
        },

        /**
         * 刷新表格在当前页不做页面变更.但是查询是不能掉该方法的
         */
        GridTableRefreshPage: function (p) {
            return this.each(function () {
                if (this.grid && p) $.extend(this.p, p);
                this.grid.refreshPage(true);
            });
        },

        /**
         * 更新之前存储的某属性的值
         * pname 需更改的属性
         * pvalue 需更改的属性的值
         * idValue idProperty 的值
         * callback 回调方法
         */
        GridTableUpdateOnePropery:function(pname,pvalue,idValue,callback){
            return this.each(function () {
                var self = this;
                var index = self.grid.indexMap[idValue];
                if (index === undefined) {
                    $.each(self.p.data, function (i, t) {
                        if (t[self.p.idProperty || self.p.colModel[0].name] == idValue) {
                            index = i;
                            return true;
                        }
                    });
                }
                var trContent = $('#' + self.p.bodyID).find('tr[index=' + index + ']').eq(0);
                var record = trContent.data('record') || {};
                record[pname] = pvalue;
                trContent.data('record', record);
                callback && callback instanceof Function && callback(trContent);
            });
        },
        /**
         * 更新指定单元格的值
         * @param cell {{id: {*} 单元格所在记录的idProperty属性的值, index: {number} 单元格所在的行号, name: {string} 单元格所在的属性名 } | {jQuery}}
         * @param value
         * @param callback
         */
        GridTableUpdateCell: function (cell, value, callback) {
            return this.each(function () {
                var self = this;
                if (!(cell instanceof jQuery) || !((typeof HTMLElement === 'object') ?
                    function (obj) {
                        return obj instanceof HTMLElement;
                    } :
                    function (obj) {
                        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
                    })) {
                    var index = cell.index || self.grid.indexMap[cell.id], name = cell.name;
                    if (index === undefined) {
                        $.each(self.p.data, function (i, t) {
                            if (t[self.p.idProperty || self.p.colModel[0].name] == cell.id) {
                                index = i;
                                return true;
                            }
                        });
                    }
                    cell = $('#' + self.p.bodyID).find('tr[index=' + index + ']').find('.BodyTdContent[name="' + name + '"]');
                }
                self.grid.setCellData(cell, value);
                callback && callback instanceof Function && callback(cell);
            });
        },
        /**
         * 更新当前表格的内容 有个必备条件 idProperty 开始必须配置 且正确
         * @param data 原始数据
         * @param callback
         */
        GridTableUpdateRow : function(data,np,callback){
            return this.each(function () {
                var self = this;
                if(!data || !$.isArray(data) ){
                    callback && callback instanceof Function && callback(data,false);
                }else{
                    $.each(data,function(t,e){
                        self.grid.setRowData(e,np);
                    });
                    callback && callback instanceof Function && callback(data,true);
                }
            });
        },
        /**
         * 获取当前页页码
         */
        GridTableCurPage: function () {
            var curPage = 1;
            if (this[0] && this[0].grid)
                curPage = this[0].grid.p.currentPage;
            return curPage;
        },

        /**
         * 新增结构相同的行, expand的另一种方式
         */
        GridTableAppendRow: function (index, dataList) {
            this[0].grid.appendRow(index, dataList);
        }
    });

})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwbHVnaW5zL0dyaWRUYWJsZS9HcmlkVGFibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGpRdWVyeVxyXG4gKi9cclxuZGVmaW5lKFsnanF1ZXJ5JywgJ21haW4vcmlnaHQnLCAnY3NzIXBsdWdpbnMvR3JpZFRhYmxlL2Nzcy9HcmlkVGFibGUuY3NzJ10sIGZ1bmN0aW9uICgkLCBNZW51KSB7XHJcblxyXG4gICAgdmFyIGFkZEdyaWQgPSBmdW5jdGlvbiAodCwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBwID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICAgICAgZXhwYW5kRmxhZzogJycsXHJcbiAgICAgICAgICAgIGV4cGFuZERpc2FibGVGbGFnOiAnJywgICAgICAgICAvL+WIl+ihqOWxleW8gOaYr+WQpuaYvuekuuS4uuemgeeUqOWbvuagh+WIpOaWreWHveaVsFxyXG4gICAgICAgICAgICB3aWR0aDogJ2F1dG8nLCAgICAgICAgICAgICAgICAgLy/pgInmi6nmoYblrr3luqZcclxuICAgICAgICAgICAgaGVpZ2h0OiAnYXV0bycsICAgICAgICAgICAgICAgIC8v6YCJ5oup5qGG6auY5bqmXHJcblxyXG4gICAgICAgICAgICB1cmw6ICcnLCAgICAgICAgICAgICAgICAgICAgICAgLy/ooajmoLzmlbDmja7lkI7lj7Dor7fmsYLlnLDlnYBcclxuICAgICAgICAgICAgbGlzdDogJ2xpc3QnLCAgICAgICAgICAgICAgICAgIC8v5ZCO5Y+w6K+35rGC55qE5pWw5o2u5YiX6KGo5ZCNXHJcbiAgICAgICAgICAgIHRvdGFsOiAndG90YWwnLCAgICAgICAgICAgICAgICAvL+WQjuWPsOivt+axgueahOaVsOaNruaAu+iusOW9leWQjVxyXG4gICAgICAgICAgICBwYXJhbXM6IHt9LCAgICAgICAgICAgICAgICAgICAgLy/or7fmsYLnmoTlj4LmlbBcclxuXHJcbiAgICAgICAgICAgIGhlYWRlcjogdHJ1ZSwgICAgICAgICAgICAgICAgICAvL+ihqOagvOaYr+WQpuacieihqOWktO+8jGZhbHNl5LiN5pi+56S677yMdHJ1ZeaYvuekulxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsICAgICAgICAgICAgICAgICAgLy/ooajmoLzmmK/lkKbmnInmoIfpopjvvIxmYWxzZeS4jeaYvuekuu+8jHRydWXmmL7npLpcclxuICAgICAgICAgICAgcGFnZUJhcjogdHJ1ZSwgICAgICAgICAgICAgICAgIC8v6KGo5qC85piv5ZCm5pyJ5bel5YW35p2h77yMZmFsc2XkuI3mmL7npLrvvIx0cnVl5pi+56S6XHJcbiAgICAgICAgICAgIGJvZHk6IHRydWUsXHRcdFx0XHQgICAgICAgLy/ooajmoLzmmK/lkKbmnInooajmoLzkuLvkvZPlhoXlrrnvvIxmYWxzZeS4jeaYvuekuu+8jHRydWXmmL7npLpcclxuICAgICAgICAgICAgdG9vbEJhcjogZmFsc2UsXHRcdFx0ICAgICAgIC8v6KGo5qC85piv5ZCm5pyJ6KGo5qC85bel5YW35p2h77yMZmFsc2XkuI3mmL7npLrvvIx0cnVl5pi+56S6XHJcblxyXG4gICAgICAgICAgICB0aXRsZVRleHQ6IGZhbHNlLFx0XHQgICAgICAgLy/ooajmoLznmoTmoIfpopjlhoXlrrnvvIxzdHJpbmflnotcclxuICAgICAgICAgICAgdGl0bGVfY2VsbHNwYWNpbmc6ICcwJyxcdCAgICAgICAvL3RpdGxl6Ze06ZqUXHJcbiAgICAgICAgICAgIGhlYWRlcl9jZWxsc3BhY2luZzogJzAnLCAgICAgICAvL2hlYWRlcumXtOmalFxyXG4gICAgICAgICAgICBib2R5X2NlbGxzcGFjaW5nOiAnMCcsXHQgICAgICAgLy9ib2R56Ze06ZqUXHJcbiAgICAgICAgICAgIHRvb2xCYXJfY2VsbHNwYWNpbmc6ICcwJywgICAgICAvL3Rvb2xCYXLpl7TpmpRcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IHRydWUsICAgICAgICAgICAgICAgIC8v5piv5ZCm5ZCv55So5rua5Yqo5p2hXHJcbiAgICAgICAgICAgIHRpdGxlTW9kZWw6XHRcdFx0XHQgICAgICAgLy/ooajmoLznmoTlpI3mnYLmoIfpopjlhoXlrrnmqKHlnotcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAn55S156uZ5ZCN56ewJywgZXh0ZW5kOiB7J2lkJzogJzExJ30sIGFsaWduOiBcImNlbnRlclwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXk6ICfnlLXnq5nlkI3np7AnLCBhbGlnbjogXCJjZW50ZXJcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAn55S156uZ5ZCN56ewJywgd2lkdGg6ICcwLjEnLCBhbGlnbjogXCJyaWdodFwifVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIF0sXHJcblxyXG5cclxuICAgICAgICAgICAgbG9hZEVycm9yOiBmYWxzZSxcdFx0ICAgICAgIC8v5pWw5o2u6K+35rGC5aSx6LSl55qE5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgIGxvYWRSZWFkeTogZmFsc2UsXHRcdCAgICAgICAvL+aVsOaNruivt+axguaIkOWKn+eahOWbnuiwg+WHveaVsFxyXG5cclxuICAgICAgICAgICAgZGF0YTogZmFsc2UsXHRcdFx0XHQgICAvL+ihqOagvOWGheaJgOimgeWhq+WFheeahOaVsOaNrlxyXG4gICAgICAgICAgICBwcm90b3R5cGVEYXRhOiBmYWxzZSwgXHRcdFx0Ly/ljp/lnovmlbDmja4gbGlzdDpbXSDmlbDnu4RcclxuICAgICAgICAgICAgcHJvdG90eXBlU29ydDogZnVuY3Rpb24gKHByb3AsIHNvcnQpIHsgLy8g6buY6K6k5o6S5bqP5pa55rOVXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iajEsIG9iajIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AgfHwgIXNvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwxID0gb2JqMVtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsMiA9IG9iajJbcHJvcF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsMSkpICYmICFpc05hTihOdW1iZXIodmFsMikpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDEgPSBOdW1iZXIodmFsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDIgPSBOdW1iZXIodmFsMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwxIDwgdmFsMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJkZXNjXCIgPT0gc29ydC50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsMSA+IHZhbDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZGVzY1wiID09IHNvcnQudG9Mb3dlckNhc2UoKSA/IC0xIDogMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBvblNpbmdsZUNsaWNrOiBmYWxzZSxcdCAgICAgICAvL+ihqOagvOihjOeCueWHu+S6i+S7tlxyXG4gICAgICAgICAgICBvbkRvdWJsZUNsaWNrOiBmYWxzZSxcdCAgICAgICAvL+ihqOagvOihjOWPjOWHu+S6i+S7tlxyXG4gICAgICAgICAgICBvbkxvYWRSZWFkeTogZmFsc2UsXHRcdCAgICAgICAvL+ihqOagvOS4u+S9k+WGheWuueWKoOi9veWujOaIkOeahOWbnuiwg+WHveaVsFxyXG5cclxuICAgICAgICAgICAgaXNTaG93U2VsZWN0OiB0cnVlLCAgICAgICAgICAgIC8v5piv5ZCm5pi+56S66YCJ5oup5pON5L2c5YiXXHJcbiAgICAgICAgICAgIHNpbmdsZVNlbGVjdDogZmFsc2UsIFx0ICAgICAgIC8v5Y+v5aSa6YCJ6L+Y5piv5Y2V6YCJ77yMdHJ1ZeWNlemAie+8jGZhbHNl5aSa6YCJXHJcbiAgICAgICAgICAgIGlzQWxsU2VsZWN0OiB0cnVlLCAgICAgICAgICAgICAvL+aYr+WQpuWPr+WFqOmAie+8iOW9kyBzaW5nbGVTZWxlY3QgPSBmYWxzZSDml7bmnInmlYjvvIlcclxuICAgICAgICAgICAgY2xpY2tTZWxlY3Q6IGZhbHNlLFx0XHQgICAgICAgLy/ooYzmmK/lkKblj6/ku6Xngrnlh7tcclxuXHJcbiAgICAgICAgICAgIG1heF9oZWlnaHQ6ICdhdXRvJyxcdFx0ICAgICAgIC8v5pyA5aSn6auY5bqmXHJcbiAgICAgICAgICAgIGxpbmVfaGVpZ2h0OiA0MCxcdFx0ICAgICAgIC8v5Y2V6KGM6KGM6auYXHJcbiAgICAgICAgICAgIHByZUNvbHVtbldpZHRoOiAxODAsXHRcdCAgIC8v6buY6K6k5YiX5a695bqmXHJcbiAgICAgICAgICAgIHNyY29sbFdpZHRoOjUsIFx0XHRcdFx0ICAgLy/pu5jorqTmu5rliqjmnaHlrr3luqZcclxuICAgICAgICAgICAgcnA6IDEwLFx0XHRcdFx0XHQgICAgICAgLy/ooajmoLzlvZPliY3mr4/pobXlj6/oo4Xovb3nmoTorrDlvZXmnaHmlbBcclxuICAgICAgICAgICAgcnBzOiBbNSwgMTAsIDE1LCAzMCwgNTBdLFx0ICAgICAgIC8v6KGo5qC85q+P6aG15Y+v6KOF6L2955qE6K6w5b2V5p2h5pWw5YiG6YWNXHJcbiAgICAgICAgICAgIHRvdGFsUmVjb3JkczogMCxcdFx0ICAgICAgIC8v6KGo5qC85oC76K6w5b2V5pWwXHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlOiAxLFx0XHRcdCAgICAgICAvL+ihqOagvOW9k+WJjemhteaVsFxyXG4gICAgICAgICAgICB0b3RhbFBhZ2U6IDEsXHRcdFx0ICAgICAgIC8v6KGo5qC85oC76aG15pWwXHJcbiAgICAgICAgICAgIHRvUGFnZTogMSxcdFx0XHRcdCAgICAgICAvL+ihqOagvOimgei3s+i9rOeahOmhteaVsFxyXG5cclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInLFx0XHQgICAgICAgLy/pu5jorqTmjpLniYjnsbvlnotcclxuXHJcbiAgICAgICAgICAgIGNvbE1vZGVsOiBudWxsLFx0XHRcdCAgICAgICAvL+WNleihjOihqOWktOaooeWei+iuvue9ru+8jOS9v+eUqOaWueW8j+S4jmNvbE1vZGVsc+exu+S8vFxyXG5cclxuICAgICAgICAgICAgcmVzaXphYmxlOiB0cnVlLFx0XHQgICAgICAgLy/mmK/lkKboh6rpgILlupTlj5jljJZcclxuICAgICAgICAgICAgY29sdW1uRmlsdGVyOiBmYWxzZSwgICAgICAgICAgIC8v5bGV56S65YiX5Y+v6K6+572u77yM6buY6K6k77yaZmFsc2XvvIzooajnpLrlhajpg6jmmL7npLrvvIzkuI3lj6/orr7nva7vvJvmlbDnu4TvvIzmjIflrprlvZPliY3mmL7npLrliJfnmoTliJflkI1bbmFtZeWxnuaAp+WAvOaVsOe7hF3vvIzlpoJbXCJuYW1lXCIsIFwiYWdlXCJdXHJcblxyXG4gICAgICAgICAgICBwYXJlbnQ6IGZhbHNlLFx0XHRcdCAgICAgICAvL+eItueql1xyXG5cclxuICAgICAgICAgICAgaXNTaG93Tm9EYXRhOiBmYWxzZSwgICAgICAgICAgIC8v5piv5ZCm5Zyo5peg5pWw5o2u5pe25Zyo6KGo5qC85Lit5pi+56S65o+Q56S65L+h5oGvXHJcbiAgICAgICAgICAgIGlzUmVjb3JkU2VsZWN0ZWQ6IGZhbHNlLCAgICAgICAvL+i3qOmhtemAieaLqVxyXG4gICAgICAgICAgICBpc1NlYXJjaFJlY29yZFNlbGVjdGVkOiBmYWxzZSwgLy/mmK/lkKblnKjmn6Xor6Lml7borrDlvZXpgInkuK3pobksIGlzUmVjb3JkU2VsZWN0ZWQ9dHJ1ZeaXtueUn+aViFxyXG4gICAgICAgICAgICBzaG93U2VsZWN0ZWROYW1lOiBmYWxzZSwgICAgICAgLy/mmL7npLrpgInkuK3pobnlsZXnpLrmnb9cclxuICAgICAgICAgICAgaWRQcm9wZXJ0eTogZmFsc2UsICAgICAgICAgICAgIC8v5Li76ZSu77yI6buY6K6k6YWN572u5qih5Z6L5Lit55qE56ys5LiA5YiX77yJXHJcblxyXG4gICAgICAgICAgICBleHBhbmQ6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy97Qm9vbGVhbiB8IEZ1bmN0aW9uIChyZWNvcmQsIGJveCwgaW5kZXgpfSDmmK/lkKblj6/lsZXlvIDvvIzlpoLmnpzov5nph4zmmK/kuIDkuKrmlrnms5XvvIzpgqPkuYjlsZXlvIDml7bkvJrmiafooYzor6Xmlrnms5VcclxuICAgICAgICAgICAgZm9sZDogZmFsc2UsICAgICAgICAgICAgICAgICAgIC8ve0Jvb2xlYW4gfCBGdW5jdGlvbiAoYm94LCBpbmRleCl9IOmFjeWll2V4cGFuZOWPguaVsOS9v+eUqO+8jOWmguaenGV4cGFuZOS4unRydWXmiJbogIXmlrnms5XvvIzlnKjlsZXlvIDlsYLmlLbotbfmnaXml7bkvJrmiafooYzor6Xmlrnms5VcclxuICAgICAgICAgICAgZXhwYW5kSW5kZXg6IG51bGwsICAgICAgICAgICAgIC8v5Yid5aeL5bGV5byA6KGM5Y+377yM5Z+65pWw5Li6IDDvvIzpu5jorqQg5Yid5aeL5pe26YO95LiN5bGV5byAXHJcbiAgICAgICAgICAgIGV4cGFuZEJveEhlaWdodDogJ2F1dG8nLCAgICAgICAvL+WxleW8gOWuueWZqOeahOmrmOW6pu+8jOm7mOiupOS4ujog6KGM6auY77yIbGluZS1oZWlnaHQpXHJcblxyXG4gICAgICAgICAgICBjb2xNb2RlbHM6XHRcdFx0XHQgICAgICAgLy/lpJrooYzooajlpLTmqKHlnovorr7nva5cclxuICAgICAgICAgICAgICAgIFtcdFx0XHRcdFx0ICAgICAgIC8v5a6e5L6LXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ+eUteermeWQjeensCcsIG5hbWU6ICcwJywgcm93c3BhbjogJzInLCB3aWR0aDogJzAuMicsIGFsaWduOiBcImNlbnRlclwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXk6ICflubbnvZHnsbvlnosnLCBuYW1lOiAnNycsIHJvd3NwYW46ICcyJywgd2lkdGg6ICcwLjEnLCBhbGlnbjogXCJjZW50ZXJcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAn6YCG5Y+Y5Zmo57G75Z6LJywgbmFtZTogJzgnLCByb3dzcGFuOiAnMicsIHdpZHRoOiAnMC4xJywgYWxpZ246IFwiY2VudGVyXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAn5bel5L2c56WoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sc3BhbjogJzInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcwLjInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IHRydWUgIC8vIOaYr+WQpuaUr+aMgeivpeWIl+aOkuW6j1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ+aTjeS9nOelqCcsIG5hbWU6ICcnLCBjb2xzcGFuOiAnMicsIHdpZHRoOiAnMC4yJywgYWxpZ246IFwiY2VudGVyXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ+e8uumZtycsIG5hbWU6ICcnLCBjb2xzcGFuOiAnMicsIHdpZHRoOiAnMC4yJywgYWxpZ246IFwiY2VudGVyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAn5oC75pWwKOS4qiknLCBuYW1lOiAnMScsIHdpZHRoOiAnMC4xJywgYWxpZ246IFwiY2VudGVyXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ+W5s+Wdh+WkhOeQhuaXtumVvyhoKScsIG5hbWU6ICcyJywgd2lkdGg6ICcwLjEnLCBhbGlnbjogXCJjZW50ZXJcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkaXNwbGF5OiAn5oC75pWwKOS4qiknLCBuYW1lOiAnMycsIHdpZHRoOiAnMC4xJywgYWxpZ246IFwiY2VudGVyXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheTogJ+W5s+Wdh+WkhOeQhuaXtumVvyhoKScsIG5hbWU6ICc0Jywgd2lkdGg6ICcwLjEnLCBhbGlnbjogXCJjZW50ZXJcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICfmgLvmlbAo5LiqKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzAuMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6ICclJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogeydjb2xvcic6ICdibHVlJywgJ2ZvbnQtc2l6ZSc6ICcxNXB4J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXk6ICflubPlnYflpITnkIbml7bplb8oaCknLCBuYW1lOiAnNicsIHdpZHRoOiAnMC4xJywgYWxpZ246IFwiY2VudGVyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbGVmdENvbnRlbnQ6XHRcdCAgICAgICAgICAgLy/ooajmoLzlt6bovrnliIbpobXlt6XlhbfmnaHlhoXlrrlcclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBNc2cuZ3JpZFBhcmFtLnBhZ2VTaG93Q291bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3BsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkczogJ3BsYWJlbF8wJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogJ3NlbGVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiAncnBzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3BzZWxlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHM6ICdwc2VsZWN0X3JwcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiA2XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBNc2cuZ3JpZFBhcmFtLmVtcHR5TXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHM6ICdwbGFiZWxfdG90YWxSZWNvcmRzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJpZ2h0Q29udGVudDpcdFx0ICAgICAgICAgICAvL+ihqOagvOW3pui+ueWIhumhteW3peWFt+adoeWGheWuuVxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGJ1dHRvbl9maXJzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDNcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGJ1dHRvbl9wcmV2aW91cycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDNcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICdjdXJyZW50UGFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwbGFiZWxfY3VyUGFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkczogJ3BsYWJlbF9jdXJyZW50UGFnZTEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnc3BhbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncGJ1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkczogJ3BidXR0b25fbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDNcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGJ1dHRvbl9sYXN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMTBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IE1zZy5ncmlkUGFyYW0uYmVmb3JlUGFnZVRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3BsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkczogJ3BsYWJlbF8zJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiAnY3VycmVudFBhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncGxhYmVsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGxhYmVsX2N1cnJlbnRQYWdlMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IE1zZy5ncmlkUGFyYW0uYWZ0ZXJQYWdlVGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncGxhYmVsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGxhYmVsXzQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICd0b3RhbFBhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncGxhYmVsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGxhYmVsX3RvdGFsUGFnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IE1zZy5ncmlkUGFyYW0ubVBhZ2VUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHM6ICdwbGFiZWxfNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjAnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBNc2cuZ3JpZFBhcmFtLmp1bXBUbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncGxhYmVsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGxhYmVsXzYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnaW5wdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICd0b1BhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncHRleHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHM6ICdwdGV4dF90b1BhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiBNc2cuZ3JpZFBhcmFtLm1QYWdlVGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAncGxhYmVsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGxhYmVsXzcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6ICdHTycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3BidXR0b25fanVtcFRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRzOiAncGJ1dHRvbl9qdW1wVG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWHveaVsOmbhuWQiFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBnID0ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Yid5aeL5YyWSUTlj5jph4/kv6Hmga9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGcucCA9IHA7XHJcbiAgICAgICAgICAgICAgICBpZigobWFpbi5nZXRCcm93c2VyKCkgJiYgbWFpbi5nZXRCcm93c2VyKCkubXNpZSkpe1xyXG4gICAgICAgICAgICAgICAgXHRwLnNyY29sbFdpZHRoID0gMjA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwLnNlbGVjdGVkUmVjb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcC5pbmRleE1hcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcC5kZWZhdWx0Q29sdW1uRmlsdGVyID0gcC5jb2x1bW5GaWx0ZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgcC5zZWxlY3RvciA9ICQodCkuYXR0cignaWQnKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodCkuYXR0cignaWQnLCBpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICBwLndob2xlSUQgPSAnR3JpZFRhYmxlXycgKyBwLnNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgcC50aXRsZUlEID0gJ0dyaWRUYWJsZVRpdGxlXycgKyBwLnNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgcC5oZWFkZXJJRCA9ICdHcmlkVGFibGVIZWFkZXJfJyArIHAuc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICBwLmJvZHlJRCA9ICdHcmlkVGFibGVCb2R5XycgKyBwLnNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgcC5wYWdlQmFySUQgPSAnR3JpZFRhYmxlUGFnZUJhcicgKyBwLnNlbGVjdG9yO1xyXG5cclxuICAgICAgICAgICAgICAgIGcuY3JlYXRld2hvbGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHQpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZy5yZXNpemUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZy5yZXNpemUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0dGluZ1Nyb2xsOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIFx0dmFyIHRhYmxEaXZjbGFzcyA9XCJHcmlkVGFibGVCb2R5RGl2IC53cmFwcGVyXCI7XHJcbiAgICAgICAgICAgIFx0dmFyIHRhYnMgPSAkKCcuR3JpZFRhYmxlRGl2Jyk7XHJcbiAgICAgICAgICAgIFx0dmFyIHNyY29sbFdpZHRoID0gcC5zcmNvbGxXaWR0aDtcclxuICAgICAgICAgICAgXHRpZih0YWJzICYmIHRhYnMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBcdFx0Zm9yKHZhciBpID0gMDsgaTwgdGFicy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIFx0XHRcdHZhciB0YWJDaGxkID0gdGFic1tpXTtcclxuICAgICAgICAgICAgXHRcdFx0aWYoJCh0YWJDaGxkKS5maW5kKCcuJyt0YWJsRGl2Y2xhc3MpKXtcclxuICAgICAgICAgICAgXHRcdFx0XHR2YXIgb3cgPSB0YWJDaGxkLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBcdFx0XHRcdHZhciB0YWJEaXYgPSAkKHRhYkNobGQpLmZpbmQoJy4nK3RhYmxEaXZjbGFzcyk7XHJcbiAgICAgICAgICAgIFx0XHRcdFx0aWYodGFiRGl2WzBdLnNjcm9sbEhlaWdodCA+dGFiRGl2WzBdLm9mZnNldEhlaWdodCl7XHJcbiAgICAgICAgICAgIFx0XHRcdFx0XHR0YWJEaXYuY3NzKFwid2lkdGhcIiwoKG93K3NyY29sbFdpZHRoKS8ob3crMSkpKjEwMCtcIiVcIik7XHJcbiAgICAgICAgICAgIFx0XHRcdFx0fWVsc2V7XHJcbiAgICAgICAgICAgIFx0XHRcdFx0XHR0YWJEaXYuY3NzKFwid2lkdGhcIiwoKG93KS9vdykqMTAwK1wiJVwiKTtcclxuICAgICAgICAgICAgXHRcdFx0XHR9XHJcbiAgICAgICAgICAgIFx0XHRcdH1cclxuICAgICAgICAgICAgXHRcdH1cclxuICAgICAgICAgICAgXHR9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmlbDnu4TlpI3liLblh73mlbBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIF9hcnJheUNvcHk6IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvcHkgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5ICYmIGFycmF5IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3B5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5WzBdWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChhcnJheSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29weS5wdXNoKHRoaXMuY29uY2F0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5ID0gYXJyYXkuY29uY2F0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcHk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDniLbnqpflpKflsI/lj5jljJbnmoTlm57osIPlh73mlbBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBcdGcuc2V0dGluZ1Nyb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdyA9IGcuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgIGlmICghcC5yZXNpemFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwLmJvZHkgJiYgZy5yZXNpemVCb3goKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzaXplQm94OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5yZXNpemFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0KS5maW5kKCd0YWJsZScpLmZpbHRlcihmdW5jdGlvbiAoaW5kZXgsIHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNpemVEb21MaXN0ID0gJCgnPnRib2R5PnRyPi5HcmlkSXRlbScsICQodmFsKSkubm90KCcubGFzdEl0ZW0sIC5ub1Jlc2l6ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNpemVEb21MaXN0LCBmdW5jdGlvbiAoaSwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdyA9ICQodCkuYXR0cignZGF0YS13aWR0aCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcncgPSBnLmNhbFdpZHRoKHcsIHAuY29sX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodCkud2lkdGgocncpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHQpLmF0dHIoJ3dpZHRoJywgcncpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAucGFnZUJhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocC5ib3hXaWR0aCA8IDY3OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkdyaWRUYWJsZVRvb2xCYXJCb2R5TGVmdCcsICQoJyMnICsgcC5wYWdlQmFySUQpKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocC5ib3hXaWR0aCA8IDQ3OCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5HcmlkVGFibGVUb29sQmFyQm9keVJpZ2h0IC5wbGFiZWwsIC5HcmlkVGFibGVUb29sQmFyQm9keVJpZ2h0IC5wdGV4dCwgLkdyaWRUYWJsZVRvb2xCYXJCb2R5UmlnaHQgLnBidXR0b25fanVtcFRvJywgJCgnIycgKyBwLnBhZ2VCYXJJRCkpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkdyaWRUYWJsZVRvb2xCYXJCb2R5UmlnaHQgLnBsYWJlbCwgLkdyaWRUYWJsZVRvb2xCYXJCb2R5UmlnaHQgLnB0ZXh0LCAuR3JpZFRhYmxlVG9vbEJhckJvZHlSaWdodCAucGJ1dHRvbl9qdW1wVG8nLCAkKCcjJyArIHAucGFnZUJhcklEKSkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkdyaWRUYWJsZVRvb2xCYXJCb2R5TGVmdCcsICQoJyMnICsgcC5wYWdlQmFySUQpKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuR3JpZFRhYmxlVG9vbEJhckJvZHlSaWdodCAucGxhYmVsLCAuR3JpZFRhYmxlVG9vbEJhckJvZHlSaWdodCAucHRleHQsIC5HcmlkVGFibGVUb29sQmFyQm9keVJpZ2h0IC5wYnV0dG9uX2p1bXBUbycsICQoJyMnICsgcC5wYWdlQmFySUQpKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKCcjJyArIHAuYm9keUlEICsgJz4ud3JhcHBlcicpLmhhc0NsYXNzKCdhdXRvSGVpZ2h0Qm9keScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5ib2R5SUQgKyAnPi53cmFwcGVyJykuaGVpZ2h0KHAuaGVpZ2h0IC0gJCgnIycgKyBwLmhlYWRlcklEKS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDojrflj5bniLbnqpfnmoTlrr3luqbvvIzlvZPkvZzmlLnooajmoLzmj5Lku7blrr3luqZcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldEJveFNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCcjJyArIHAucGFyZW50KS53aWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSAkKHQpLCBpID0gMDtcclxuICAgICAgICAgICAgICAgIHdoaWxlICghbm9kZS53aWR0aCgpICYmIGkgPCAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUud2lkdGgoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOiOt+WPluWGheWuueS9k+eahOWuveW6plxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0Q29udGVudFNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGlmIChwLnJlc2l6YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFdpZHRoID0gZy5nZXRCb3hTaXplKCkgLSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sTnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocC5jb2xNb2RlbENvcHksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbE51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sTnVtID0gcC5jb2x1bW5GaWx0ZXIubGVuZ3RoIHx8IHAuY29sX251bSB8fCBjb2xOdW0gfHwgODtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRXaWR0aCA9IE1hdGgubWF4KGcuZ2V0Qm94U2l6ZSgpIC0gMSwgcC5wcmVDb2x1bW5XaWR0aCAqIGNvbE51bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFdpZHRoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6K6h566X5YWD57Sg5a695bqmXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB3aWR0aCDlrr3luqbooajnpLrlgLxcclxuICAgICAgICAgICAgICogQHBhcmFtIGNvbHMg5oC75YiX5pWwXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXIgfCAqfSDlrp7pmYXlrr3luqblgLxcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNhbFdpZHRoOiBmdW5jdGlvbiAod2lkdGgsIGNvbHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRXaWR0aCA9IGcuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgIChwLmNsaWNrU2VsZWN0ICYmIHAuaXNTaG93U2VsZWN0KSAmJiAocmVzdWx0V2lkdGggLT0gcC5saW5lX2hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBwLmV4cGFuZCAmJiAocmVzdWx0V2lkdGggLT0gcC5saW5lX2hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGggPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29scykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQod2lkdGggKiAocmVzdWx0V2lkdGggLSBwLmNvbF9udW0gKiAyICsgY29scyAvIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh3aWR0aCAqIChyZXN1bHRXaWR0aCAtIHAuY29sX251bSAqIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKHdpZHRoICsgXCJcIikuaW5kZXhPZignJScpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9ICh3aWR0aCArIFwiXCIpLmluZGV4T2YoJyUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHcgPSB3aWR0aC5zdWJzdHJpbmcoMCwgaW5kZXggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHcgKiByZXN1bHRXaWR0aCkgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgocmVzdWx0V2lkdGggLSBwLmNvbF9udW0gKiAyKSAvIGNvbHMgLSBjb2xzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIm+W7uuihqOagvOaVtOS9k+eahERJVlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRld2hvbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgICAgICAgIGlmIChwLmNvbE1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jb2xNb2RlbENvcHkgPSBnLl9hcnJheUNvcHkocC5jb2xNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGcucmVzZXRDb2xNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHAuY29sdW1uTmFtZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHAuY29sX251bSA9IDA7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gocC5jb2xNb2RlbENvcHksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLmNvbHVtbk5hbWVzLnB1c2goe2lkOiB0aGlzLm5hbWUsIG5hbWU6IHRoaXMuZGlzcGxheSwgd2lkdGg6IHRoaXMud2lkdGgsIGxlYWY6IHRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5jb2xfbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcC5ib3hXaWR0aCA9IGcuZ2V0Qm94U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgcC5jb250ZW50V2lkdGggPSBnLmdldENvbnRlbnRTaXplKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0KS5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkaXYgPSAkKFwiPGRpdiBjbGFzcz0nR3JpZFRhYmxlRGl2JyBpZD0nXCIgKyBwLndob2xlSUQgKyBcIicvPlwiKTtcclxuICAgICAgICAgICAgICAgIC8vZGl2LmNzcyh7J3dpZHRoJzogcC5ib3hXaWR0aH0pO1xyXG4gICAgICAgICAgICAgICAgZGl2LmF0dHIoJ3Jlc2l6YWJsZScsIHAucmVzaXphYmxlKTtcclxuICAgICAgICAgICAgICAgICFwLnJlc2l6YWJsZSAmJiBkaXYuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteCc6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cteSc6ICdoaWRkZW4nXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQodCkuYXBwZW5kKGRpdik7XHJcblxyXG4gICAgICAgICAgICAgICAgcC5pc1JlY29yZFNlbGVjdGVkICYmIHAuc2hvd1NlbGVjdGVkTmFtZSAmJiBnLmNyZWF0ZVNlbGVjdGVkU2hvd0JveCgpO1xyXG4gICAgICAgICAgICAgICAgcC50aXRsZSAmJiBnLmNyZWF0ZVRpdGxlKCk7XHJcbiAgICAgICAgICAgICAgICBwLmhlYWRlciAmJiBnLmNyZWF0ZUhlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgcC5ib2R5ICYmIGcuY3JlYXRlQm9keSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHAucGFnZUJhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGcucGFnZUJhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGcuaW5pdEV2ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcC5ib2R5ICYmIChwLmRhdGEgPyBnLmFkZERhdGEoKSA6IGcucmVmcmVzaFBhZ2UoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliJvlu7rooajmoLzpgInkuK3pobnlsZXnpLrmnb9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNyZWF0ZVNlbGVjdGVkU2hvd0JveDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9ICQoJzx1bD48L3VsPicpLmFkZENsYXNzKCdzZWxlY3RlZFNob3dCb3gnKTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC5zZWxlY3RvcikuYXBwZW5kKGRpdik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliJvlu7rooajmoLzmoIfpophcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNyZWF0ZVRpdGxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gJChcIjxkaXYgY2xhc3M9J0dyaWRUYWJsZVRpdGxlRGl2JyBpZD0nXCIgKyBwLnRpdGxlSUQgKyBcIicvPlwiKTtcclxuICAgICAgICAgICAgICAgIGRpdi5jc3Moeyd3aWR0aCc6IHAuYm94V2lkdGgsICdoZWlnaHQnOiBwLmxpbmVfaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAuc2VsZWN0b3IpLmFwcGVuZChkaXYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHAudGl0bGVUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFkZENsYXNzKCdTaW5nbGVUaXRsZScpLmh0bWwocC50aXRsZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0YWJsZUNvbnRlbnQgPSAkKCc8dGFibGUgd2lkdGg9XCIxMDAlXCIgY2xhc3M9XCJHcmlkVGFibGVUaXRsZVwiIGNlbGxwYWRkaW5nPVwiMFwiIGJvcmRlcj1cIjBcIi8+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2VsbHNwYWNpbmcnLCBwLnRpdGxlX2NlbGxzcGFjaW5nKTtcclxuICAgICAgICAgICAgICAgIGRpdi5hcHBlbmQodGFibGVDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChwLnRpdGxlTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJDb250ZW50ID0gJChcIjx0ci8+XCIpLmNzcyh7J2hlaWdodCc6IHAubGluZV9oZWlnaHR9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVDb250ZW50LmFwcGVuZCh0ckNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLnRpdGxlTW9kZWxbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZy5jcmVhdGVUaXRsZUxlZnQodHJDb250ZW50LCBwLnRpdGxlTW9kZWxbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocC50aXRsZU1vZGVsWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuY3JlYXRlVGl0bGVSaWdodCh0ckNvbnRlbnQsIHAudGl0bGVNb2RlbFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Yib5bu66KGo5qC85qCH6aKY5bem6L655YaF5a65XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjcmVhdGVUaXRsZUxlZnQ6IGZ1bmN0aW9uICh0ckNvbnRlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZENvbnRlbnQgPSAkKFwiPHRkIHN0eWxlPSd0ZXh0LWFsaWduOmxlZnQnOyB3aWR0aD0nNTAlJyBjbGFzcz0nR3JpZFRhYmxlVGl0bGVMZWZ0VEQnLz5cIik7XHJcbiAgICAgICAgICAgICAgICB0ckNvbnRlbnQuYXBwZW5kKHRkQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFibGVDb250ZW50ID0gJCgnPHRhYmxlIGNsYXNzPVwiR3JpZFRhYmxlVGl0bGVcIiBjZWxscGFkZGluZz1cIjBcIiBib3JkZXI9XCIwXCIvPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NlbGxzcGFjaW5nJywgcC50aXRsZV9jZWxsc3BhY2luZyk7XHJcbiAgICAgICAgICAgICAgICB0ZENvbnRlbnQuYXBwZW5kKHRhYmxlQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBnLmNyZWF0ZVRpdGxlVFIodGFibGVDb250ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIm+W7uuihqOagvOagh+mimOWPs+i+ueWGheWuuVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRlVGl0bGVSaWdodDogZnVuY3Rpb24gKHRyQ29udGVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRkQ29udGVudCA9ICQoXCI8dGQgc3R5bGU9J3RleHQtYWxpZ246cmlnaHQnIHdpZHRoPSc1MCUnIGNsYXNzPSdHcmlkVGFibGVUaXRsZVJpZ2h0VEQnLz5cIik7XHJcbiAgICAgICAgICAgICAgICB0ckNvbnRlbnQuYXBwZW5kKHRkQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFibGVDb250ZW50ID0gJCgnPHRhYmxlIGNsYXNzPVwiR3JpZFRhYmxlVGl0bGVcIiBjZWxscGFkZGluZz1cIjBcIiBib3JkZXI9XCIwXCIvPicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NlbGxzcGFjaW5nJywgcC50aXRsZV9jZWxsc3BhY2luZyk7XHJcbiAgICAgICAgICAgICAgICB0ZENvbnRlbnQuYXBwZW5kKHRhYmxlQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBnLmNyZWF0ZVRpdGxlVFIodGFibGVDb250ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIm+W7uuihqOagvOagh+mimHRy5YaF5a65XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjcmVhdGVUaXRsZVRSOiBmdW5jdGlvbiAodGFibGVDb250ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJDb250ZW50ID0gJChcIjx0ciBjbGFzcz0nR3JpZFRhYmxlVGl0bGVUUicvPlwiKTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCAmJiB0ZC5hdHRyKCd3aWR0aCcsIGcuY2FsV2lkdGgodGhpcy53aWR0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gJChcIjxkaXYvPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iZWZvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5hcHBlbmQodGhpcy5iZWZvcmUuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmVydGljYWwtYWxpZ24nOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiAnMTBweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmFwcGVuZCh0aGlzLmRpc3BsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFmdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYXBwZW5kKHRoaXMuYWZ0ZXIuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmVydGljYWwtYWxpZ24nOiAnbWlkZGxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6ICcxMHB4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRkLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leHRlbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuZXh0ZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leHRlbmQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYXR0cihrZXksIHRoaXMuZXh0ZW5kW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c3BhbiA/IHRkLmF0dHIoJ3Jvd3NwYW4nLCB0aGlzLnJvd3NwYW4pIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbHNwYW4gPyB0ZC5hdHRyKCdjb2xzcGFuJywgdGhpcy5jb2xzcGFuKSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jc3MgPyBjb250ZW50LmNzcyh0aGlzLmNzcykgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm5DbGljayA/IGNvbnRlbnQuY2xpY2sodGhpcy5mbkNsaWNrKSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlID8gY29udGVudC5oaWRlKCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9PSAnJyA/IGNvbnRlbnQuaHRtbCgnJykgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ24gPyB0ZC5jc3MoJ3RleHQtYWxpZ24nLCB0aGlzLmFsaWduKSA6IHRkLmNzcygndGV4dC1hbGlnbicsIHAuYWxpZ24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hcHBlbmQodGQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnQuYXBwZW5kKHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliJvlu7rooajmoLzooajlpLRkaXZcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNyZWF0ZUhlYWRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnd3JhcHBlcicpO1xyXG4gICAgICAgICAgICAgICAgIXAucmVzaXphYmxlICYmIGNvbnRlbnQuY3NzKHsnd2lkdGgnOiAnMTAwJSd9KTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC53aG9sZUlEKS5hcHBlbmQoJChcIjxkaXYgY2xhc3M9J0dyaWRUYWJsZUhlYWRlckRpdicgaWQ9J1wiICsgcC5oZWFkZXJJRCArIFwiJy8+XCIpLmFwcGVuZChjb250ZW50KSk7XHJcbiAgICAgICAgICAgICAgICBnLmNyZWF0ZUhlYWRlclRhYmxlKGNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHAuY29sdW1uRmlsdGVyICYmIGcuY3JlYXRlSGVhZGVyRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliJvlu7rooajmoLzooajlpLR0YWJsZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRlSGVhZGVyVGFibGU6IGZ1bmN0aW9uIChkaXYpIHtcclxuICAgICAgICAgICAgICAgIGRpdi5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhYmxlQ29udGVudCA9ICQoJzx0YWJsZSBjbGFzcz1cIkdyaWRUYWJsZUhlYWRlclwiIHdpZHRoPVwiMTAwJVwiIGNlbGxwYWRkaW5nPVwiMFwiIGJvcmRlcj1cIjBcIi8+JylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2VsbHNwYWNpbmcnLCBwLmhlYWRlcl9jZWxsc3BhY2luZyk7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChwLnJlc2l6YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGFibGVDb250ZW50LmNzcyh7XCJ3aWR0aFwiOiBwLmNvbnRlbnRXaWR0aH0pO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICBkaXYuYXBwZW5kKHRhYmxlQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHAuY29sTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwLmNvbF9udW0gPSBnLmNyZWF0ZUhlYWRlclRSKHRhYmxlQ29udGVudCwgcC5jb2xNb2RlbENvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hdHRyKCdzaW5nYWxMaW5lSGVhZGVyVGFibGUnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBwLnNpbmdhbExpbmVIZWFkZXJUYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByY29scyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jb2xfbnVtID0gcC5jb2xNb2RlbENvcHkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hdHRyKCdzaW5nYWxMaW5lSGVhZGVyVGFibGUnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5zaW5nYWxMaW5lSGVhZGVyVGFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBnLmNyZWF0ZU1pdGxIZWFkZUxheW91dFRSKHRhYmxlQ29udGVudCwgcC5jb2xNb2RlbENvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChwLmNvbE1vZGVscywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByY29scyA9IGcuY3JlYXRlSGVhZGVyVFIodGFibGVDb250ZW50LCB0aGlzLCByY29scyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Yib5bu65YiX6L+H5ruk5ZmoXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjcmVhdGVIZWFkZXJGaWx0ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICog57uY5Yi25YiX6YCJ6aG5XHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgZHJhd0JveCA9IGZ1bmN0aW9uIChjb250ZXh0LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9ICQoJ3VsJywgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtX2FsbCA9ICQoJzxsaT4nKS5hZGRDbGFzcygnZmlsdGVyLWl0ZW0nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3hfYWxsID0gJCgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicpLmF0dHIoJ2lkJywgJ2NvbHVtbl9maWx0ZXJfYWxsJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ25hbWUnLCAnYWxsT3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbV9hbGwuYXBwZW5kKCQoJzxsYWJlbCBmb3I9XCJjb2x1bW5fZmlsdGVyX2FsbFwiLz4nKS5hcHBlbmQoY2hlY2tib3hfYWxsKS5hcHBlbmQoTXNnLmFsbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94X2FsbC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5pdGVtIDpjaGVja2JveCcsIGJveCkucHJvcCgnY2hlY2tlZCcsICEhdGhpcy5jaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBib3guYXBwZW5kKGl0ZW1fYWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHAuY29sdW1uTmFtZXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKCc8bGk+JykuYWRkQ2xhc3MoJ2ZpbHRlci1pdGVtJykuYWRkQ2xhc3MoJ2l0ZW0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gJCgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicpLmF0dHIoJ2lkJywgJ2l0ZW1fJyArIHRoaXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignbmFtZScsICdpdGVtT3B0aW9ucycpLmF0dHIoJ3ZhbHVlJywgdGhpcy5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmluZGV4T2YodGhpcy5pZCkgIT0gLTEgJiYgY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tib3hfYWxsLnByb3AoJ2NoZWNrZWQnLCAkKCcuaXRlbSA6Y2hlY2tib3gnLCBib3gpLmxlbmd0aCA9PSAkKCcuaXRlbSA6Y2hlY2tlZCcsIGJveCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXBwZW5kKCQoJzxsYWJlbCBmb3I9XCJpdGVtXycgKyB0aGlzLmlkICsgJ1wiLz4nKS5hcHBlbmQoY2hlY2tib3gpLmFwcGVuZCh0aGlzLm5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LmFwcGVuZChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveF9hbGwucHJvcCgnY2hlY2tlZCcsICQoJy5pdGVtIDpjaGVja2JveCcsIGJveCkubGVuZ3RoID09ICQoJy5pdGVtIDpjaGVja2VkJywgYm94KS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ0NvbnRlbnQgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnR3JpZFRhYmxlQ29sdW1uRmlsdGVyJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ0J0biA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCdzZXR0aW5nX2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdCb3ggPSAkKCc8Zm9ybS8+JykuYWRkQ2xhc3MoJ3NldHRpbmdfYm94JykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldHRpbmdCb3guYXBwZW5kKCQoJzxoMj4nKS50ZXh0KE1zZy5ncmlkUGFyYW0uY29sdW1uRmlsdGVyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRCdG5CYXIgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnZGVmYXVsdC1idXR0b24tYmFyJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdEJ0biA9ICQoJzxidXR0b24vPicpLmF0dHIoJ3R5cGUnLCAnYnV0dG9uJykuYWRkQ2xhc3MoJ2J0bicpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoTXNnLmdyaWRQYXJhbS5kZWZhdWx0U2V0dGluZ3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOS6i+S7tiAtIOaBouWkjem7mOiupOaMiemSrlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEJ0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd0JveChzZXR0aW5nQm94LCBwLmRlZmF1bHRDb2x1bW5GaWx0ZXIgfHwgcC5jb2x1bW5GaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEJ0bkJhci5hcHBlbmQoZGVmYXVsdEJ0bik7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nQm94LmFwcGVuZChkZWZhdWx0QnRuQmFyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nQm94LmFwcGVuZCgkKCc8dWwvPicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYnRuQmFyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ2J1dHRvbi1iYXInKTtcclxuICAgICAgICAgICAgICAgIHZhciBva0J0biA9ICQoJzxidXR0b24vPicpLmF0dHIoJ3R5cGUnLCAnYnV0dG9uJykuYWRkQ2xhc3MoJ2J0bicpLnRleHQoTXNnLnN1cmUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbmNlbEJ0biA9ICQoJzxidXR0b24vPicpLmF0dHIoJ3R5cGUnLCAnYnV0dG9uJykuYWRkQ2xhc3MoJ2J0bicpLnRleHQoTXNnLmNhbmNlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5LqL5Lu2IC0g56Gu6K6k5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBva0J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2EgPSBzZXR0aW5nQm94LnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHNhLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgPT0gJ2l0ZW1PcHRpb25zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFwcC5hbGVydChNc2cuZ3JpZFBhcmFtLnNlbGVjdE9uZUxlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwLmNvbHVtbkZpbHRlciA9IGNvbHVtbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGcuY3JlYXRld2hvbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nQm94LmhpZGUoMjUwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8g5LqL5Lu2IC0g5Y+W5raI5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdG4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdCb3guaGlkZSgyNTApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnRuQmFyLmFwcGVuZChva0J0bikuYXBwZW5kKGNhbmNlbEJ0bik7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ0JveC5hcHBlbmQoYnRuQmFyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDkuovku7YgLSDlsZXlvIAv5pS26LW36K6+572u6Z2i5p2/XHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nQnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3Qm94KHNldHRpbmdCb3gsIHAuY29sdW1uRmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nQm94LnRvZ2dsZSgyNTApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ0NvbnRlbnQuYXBwZW5kKHNldHRpbmdCdG4pLmFwcGVuZChzZXR0aW5nQm94KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAuc2VsZWN0b3IpLmFwcGVuZChzZXR0aW5nQ29udGVudCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog57uY5Yi25aSa6KGM6KGo5aS05biD5bGA6KGMXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB0YWJsZUNvbnRlbnRcclxuICAgICAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNyZWF0ZU1pdGxIZWFkZUxheW91dFRSOiBmdW5jdGlvbiAodGFibGVDb250ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJDb250ZW50ID0gJChcIjx0ci8+XCIpLmFkZENsYXNzKCd0YWJsZUxheW91dExpbmUnKTtcclxuICAgICAgICAgICAgICAgIHZhciByY29scyA9IDA7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5oaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLmNvbHVtbkZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuY29sdW1uRmlsdGVyLmluZGV4T2YodGhpcy5uYW1lKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJjb2xzICs9ICgrdGhpcy5jb2xzcGFuIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5jbGlja1NlbGVjdCAmJiBwLmlzU2hvd1NlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzx0aC8+JykuYWRkQ2xhc3MoJ25vUmVzaXplJykuYXR0cignd2lkdGgnLCBwLmxpbmVfaGVpZ2h0IC8gMikuYXR0cignaGVpZ2h0JywgMSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAuZXhwYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnPHRoLz4nKS5hZGRDbGFzcygnbm9SZXNpemUnKS5hdHRyKCd3aWR0aCcsIHAubGluZV9oZWlnaHQgLyAyKS5hdHRyKCdoZWlnaHQnLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoID0gJCgnPHRoLz4nKS5hZGRDbGFzcygnR3JpZEl0ZW0nKS5hdHRyKCdkYXRhLXdpZHRoJywgdC53aWR0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDEpLmF0dHIoJ25hbWUnLCB0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoLmF0dHIoJ3dpZHRoJywgZy5jYWxXaWR0aCh0LndpZHRoLCByY29scykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0LmNvbHNwYW4gPyB0aC5hdHRyKCdjb2xzcGFuJywgdC5jb2xzcGFuKSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuaGlkZSB8fCAocC5jb2x1bW5GaWx0ZXIgJiYgcC5jb2x1bW5GaWx0ZXIuaW5kZXhPZih0Lm5hbWUpID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0ckNvbnRlbnQuYXBwZW5kKHRoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGFibGVDb250ZW50LmFwcGVuZCh0ckNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJjb2xzO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIm+W7uuihqOagvOihqOWktOihjFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRlSGVhZGVyVFI6IGZ1bmN0aW9uICh0YWJsZUNvbnRlbnQsIGRhdGEsIHRvdGFsQ29scykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyQ29udGVudCA9ICQoXCI8dHIgY2xhc3M9J0dyaWRUYWJsZUhlYWRlclRIJy8+XCIpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAocC5jbGlja1NlbGVjdCAmJiAhcC5zaW5nbGVTZWxlY3QgJiYgcC5pc0FsbFNlbGVjdCkgdHJDb250ZW50LmF0dHIoJ3RpdGxlJywgTXNnLkdyaWRUYWJsZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5pc0FsbFNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuc2luZ2xlQ2xpY2tIZWFkZXJMaW5lKHRyQ29udGVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5kYmxjbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZG91YmxlQ2xpY2tIZWFkZXJMaW5lKHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNoaWZ0aW5nID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciByY29scyA9IDAsIHJyb3dzID0gMDtcclxuICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuY29sdW1uRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocC5jb2x1bW5GaWx0ZXIuaW5kZXhPZih0aGlzLm5hbWUpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRpbmcrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJjb2xzICs9ICgrdGhpcy5jb2xzcGFuIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnJvd3MgPCArdGhpcy5yb3dzcGFuICYmIChycm93cyA9IHRoaXMucm93c3Bhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvdGFsQ29scyAmJiAocC5jbGlja1NlbGVjdCAmJiBwLmlzU2hvd1NlbGVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGggPSAkKCc8dGgvPicpLmFkZENsYXNzKCdub1Jlc2l6ZScpLmF0dHIoJ3Jvd3NwYW4nLCBycm93cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgcC5saW5lX2hlaWdodCkuYXR0cignaGVpZ2h0JywgcC5saW5lX2hlaWdodCkuY3NzKCd0ZXh0LWFsaWduJywgJ2NlbnRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSAkKCc8ZGl2Lz4nKS5jc3Moeyd3aWR0aCc6IHAubGluZV9oZWlnaHQsICdoZWlnaHQnOiBwLmxpbmVfaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN0aGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdGhjaCA9ICQoJzxpbnB1dCB0eXBlPVwicmFkaW9cIiAvPicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignbmFtZScsIHAuc2VsZWN0b3IgKyAnX3NpbmdsZV8nICsgKHAuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lKSkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0aGNoID0gJCgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiLz4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIXAuaXNBbGxTZWxlY3QgJiYgY3RoY2guaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IChwLmxpbmVfaGVpZ2h0IC0gMTMpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICBjdGhjaC5jc3MoeydtYXJnaW4nOiBtfSkuYWRkQ2xhc3MoJ0hlYWRlckNoZWNrQm94JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0aGNoWzBdLmNoZWNrZWQgPSAhY3RoY2hbMF0uY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFwcGVuZChjdGhjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguYXBwZW5kKGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFwcGVuZCh0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRvdGFsQ29scyAmJiBwLmV4cGFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aCA9ICQoJzx0aC8+JykuYWRkQ2xhc3MoJ0V4cGFuZEJveCcpLmFkZENsYXNzKCdub1Jlc2l6ZScpLmF0dHIoJ3Jvd3NwYW4nLCBycm93cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgcC5saW5lX2hlaWdodCkuYXR0cignaGVpZ2h0JywgcC5saW5lX2hlaWdodCkuY3NzKCd0ZXh0LWFsaWduJywgJ2NlbnRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSAkKCc8ZGl2Lz4nKS5jc3Moeyd3aWR0aCc6IHAubGluZV9oZWlnaHQsICdoZWlnaHQnOiBwLmxpbmVfaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFkZENsYXNzKCdIZWFkZXJFeHBhbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aC5hcHBlbmQoZGl2KTtcclxuICAgICAgICAgICAgICAgICAgICB0ckNvbnRlbnQuYXBwZW5kKHRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKGksIHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGggPSAkKCc8dGgvPicpLmFkZENsYXNzKCdHcmlkSXRlbScpLmF0dHIoJ2RhdGEtd2lkdGgnLCB0LndpZHRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgcC5saW5lX2hlaWdodCkuYXR0cignbmFtZScsIHQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkKFwiPGRpdi8+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQ29scyAtPSAodC5jb2xzcGFuIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IGcuY2FsV2lkdGgodC53aWR0aCwgcmNvbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9IGRhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aC5hdHRyKCd3aWR0aCcsIHcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoLmNzcygnd2lkdGgnLCB3KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnJlc2l6YWJsZSA/IHRoLmFkZENsYXNzKCdsYXN0SXRlbScpIDogdGguYXR0cignd2lkdGgnLCB3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jc3Moeyd3aWR0aCc6ICcxMDAlJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuYmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYXBwZW5kKHQuYmVmb3JlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheSc6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZlcnRpY2FsLWFsaWduJzogJ21pZGRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogJzEwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5hcHBlbmQodC5kaXNwbGF5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuYWZ0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5hcHBlbmQodC5hZnRlci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogJzEwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0Lm9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3J0QnkgPSAkKCc8aS8+JykuYWRkQ2xhc3MoJ3NvcnRCeScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0QnkuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAucGFyYW1zWydvcmRlckJ5J10gPSB0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYXNjJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc29ydEJ5JywgdGFibGVDb250ZW50KS5yZW1vdmVDbGFzcygnYXNjIGRlc2MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhc2MnKS5hZGRDbGFzcygnZGVzYycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAucGFyYW1zWydzb3J0J10gPSAnZGVzYyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zb3J0QnknLCB0YWJsZUNvbnRlbnQpLnJlbW92ZUNsYXNzKCdhc2MgZGVzYycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FzYycpLnJlbW92ZUNsYXNzKCdkZXNjJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5wYXJhbXNbJ3NvcnQnXSA9ICdhc2MnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5yZWZyZXNoUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLnBhcmFtcyAmJiBwLnBhcmFtc1snb3JkZXJCeSddID09IHQubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydEJ5LmFkZENsYXNzKHAucGFyYW1zWydzb3J0J10gfHwgJ2FzYycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYXBwZW5kKHNvcnRCeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuZXh0ZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmV4dGVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuZXh0ZW5kLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aC5hdHRyKGtleSwgdC5leHRlbmRba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdC5yb3dzcGFuICYmIHRoLmF0dHIoJ3Jvd3NwYW4nLCB0LnJvd3NwYW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHQuY29sc3BhbiAmJiB0aC5hdHRyKCdjb2xzcGFuJywgdC5jb2xzcGFuKTtcclxuICAgICAgICAgICAgICAgICAgICB0LmNvbnRlbnQgPT0gJycgJiYgdGguaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGguY3NzKCd0ZXh0LWFsaWduJywgcC5hbGlnbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuaGlkZSB8fCAocC5jb2x1bW5GaWx0ZXIgJiYgcC5jb2x1bW5GaWx0ZXIuaW5kZXhPZih0Lm5hbWUpID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGguYWRkQ2xhc3MoJ3Zpc2liaWxpdHknKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hcHBlbmQodGgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnQuYXBwZW5kKHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmNvbHM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlpI3liLZqc29u5pWw5o2uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3B5ID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcHlba2V5XSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6YeN5paw5pW055CG6KGo5aS05qih5Z6L5pWw5o2u77yM5Y676Zmk5ZCI5bm25Y2V5YWD5qC855qE5b2x5ZONXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZXNldENvbE1vZGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sTW9kZWxzID0gZy5fYXJyYXlDb3B5KHAuY29sTW9kZWxzKTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChjb2xNb2RlbHMsIGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29sTW9kZWxzW2ldW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sTW9kZWxzW2ldW2pdLmNvbHNwYW4gJiYgIWNvbE1vZGVsc1tpXVtqXS5jb2xDb3B5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sc3BhbiA9IHBhcnNlSW50KGNvbE1vZGVsc1tpXVtqXS5jb2xzcGFuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSBqICsgMTsgayA8IGogKyBjb2xzcGFuOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IGcuY2xvbmUoY29sTW9kZWxzW2ldW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbENvcHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbE1vZGVsc1tpXS5zcGxpY2UoaywgMCwgdGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqICs9IGNvbHNwYW4gLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sTW9kZWxzLCBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbiAoaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb3dzcGFuICYmICF0aGlzLnJvd0NvcHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3dzcGFuID0gcGFyc2VJbnQodGhpcy5yb3dzcGFuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSBpICsgMTsgayA8IGNvbE1vZGVscy5sZW5ndGggJiYgayA8IGkgKyByb3dzcGFuOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IGcuY2xvbmUodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3dDb3B5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xNb2RlbHNba10uc3BsaWNlKGosIDAsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChjb2xNb2RlbHMsIGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMsIGZ1bmN0aW9uIChqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbHNwYW4gJiYgdGhpcy5jb2xDb3B5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xNb2RlbHNbaV0uc3BsaWNlKGosIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1heCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGNvbE1vZGVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xNb2RlbHNbaV0ubGVuZ3RoID49IGNvbE1vZGVsc1tpIC0gMV0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcC5jb2xNb2RlbENvcHkgPSBjb2xNb2RlbHNbbWF4XS5jb25jYXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIm+W7uuihqOagvOS4u+S9k1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgY3JlYXRlQm9keTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSAkKCc8ZGl2IGNsYXNzPVwiR3JpZFRhYmxlQm9keURpdlwiIGlkPVwiJyArIHAuYm9keUlEICsgJ1wiIC8+Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3dyYXBwZXInKTtcclxuICAgICAgICAgICAgICAgICFwLnJlc2l6YWJsZSAmJiBkaXYuY3NzKHsnd2lkdGgnOiBwLmNvbnRlbnRXaWR0aCAtIDF9KTtcclxuICAgICAgICAgICAgICAgIHZhciB0YWJsZUNvbnRlbnQgPSAkKCc8dGFibGUgY2xhc3M9XCJHcmlkVGFibGVCb2R5XCIgd2lkdGg9XCIxMDAlXCIgY2VsbHBhZGRpbmc9XCIwXCIgYm9yZGVyPVwiMFwiLz4nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjZWxsc3BhY2luZycsIHAuYm9keV9jZWxsc3BhY2luZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5leHBhbmQpIHtcclxuICAgICAgICAgICAgICAgIFx0dGFibGVDb250ZW50LmFkZENsYXNzKFwiR3JpZFRhYmxlRXhwYW5kQm9keVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vaWYgKHAucmVzaXphYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0YWJsZUNvbnRlbnQuY3NzKHtcIndpZHRoXCI6IHAuY29udGVudFdpZHRofSk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIHZhciBvdmVyZmxvd1kgPSAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXAub3ZlcmZsb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1kgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHAubWF4X2hlaWdodCAmJiBkaXYuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnbWF4LWhlaWdodCc6IHAubWF4X2hlaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ292ZXJmbG93LXknOiAocC5yZXNpemFibGUgPyBvdmVyZmxvd1kgOiAndmlzaWJsZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICdvdmVyZmxvdy14JzogJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHAuaGVpZ2h0ICYmIHAuaGVpZ2h0ICE9ICdhdXRvJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hZGRDbGFzcygnZml4ZWRIZWlnaHRCb2R5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmhlaWdodChwLmhlaWdodCAtICQoJyMnICsgcC5zZWxlY3RvciArICdHcmlkVGFibGVIZWFkZXInKS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGl2LmFwcGVuZCh0YWJsZUNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBwLndob2xlSUQpLmFwcGVuZChjb250ZW50LmFwcGVuZChkaXYpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmRhdGEocC53aG9sZUlELCBnLmNyZWF0ZVJvd1RlbXBsYXRlKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5ouT5bGV5YiX5YaF5a6577yM5a6e6ZmF5LiK5LiN5pi+56S677yM5Y+q5piv5Li65LqG5Y+v5Lul5Y+W5Yiw5pWw5o2uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBleHBhbmRDb2xNb2RlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAuZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwLmNvbE1vZGVsQ29weSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLmNvbE1vZGVsQ29weSA9IGcuX2FycmF5Q29weShwLmNvbE1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBwLmRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAuY29sTW9kZWxDb3B5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuY29sTW9kZWxDb3B5W2ldLm5hbWUgPT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZS5kaXNwbGF5ID0ga2V5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUubmFtZSA9IGtleTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lLmhpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUud2lkdGggPSAwLjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5jb2xNb2RlbENvcHkudW5zaGlmdChsaW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDoh6rlrprkuYnlsZXlvIDmlrnlvI8sXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBhcHBlbmRSb3c6IGZ1bmN0aW9uIChpbmRleCwgZGF0YUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGcuY2xlYXJBcHBlbmRSb3coKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhTGlzdC5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGcuY3JlYXRlUm93cygkKHQpLmZpbmQoXCJ0cltpbmRleD0nXCIgKyBpbmRleCArIFwiJ11cIiksIGRhdGFMaXN0LCBcInN1YnNldFwiKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNsZWFyQXBwZW5kUm93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAuYm9keUlEICsgJy5HcmlkVGFibGVCb2R5RGl2IHRyW2luZGV4PVwic3Vic2V0XCJdJykuZWFjaChmdW5jdGlvbiAoaSwgcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IGcuZ2V0RGF0YSgkKHJvdykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGcubWFwLnJlbW92ZShyZWNvcmRbcC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHJvdykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY3JlYXRlUm93VGVtcGxhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ckNvbnRlbnQgPSAkKFwiPHRyLz5cIikuY3NzKHsnaGVpZ2h0JzogcC5saW5lX2hlaWdodH0pLmF0dHIoJ2luZGV4JywgJ3t7aW5kZXh9fScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwLmxpbmVQaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ckNvbnRlbnQuYXBwZW5kKCQoXCI8dGQvPlwiKS5jc3MoJ3RleHQtYWxpZ24nLCAnY2VudGVyJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzaGlmdGluZyA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmNvbHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbE1vZGVsID0gcC5jb2xNb2RlbENvcHk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sTW9kZWwsIGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuY29sdW1uRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocC5jb2x1bW5GaWx0ZXIuaW5kZXhPZih0aGlzLm5hbWUpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmNvbHMgKz0gKCt0aGlzLmNvbHNwYW4gfHwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdGluZysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5jbGlja1NlbGVjdCAmJiBwLmlzU2hvd1NlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZCA9ICQoJzx0ZC8+JykuYWRkQ2xhc3MoJ25vUmVzaXplJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgcC5saW5lX2hlaWdodCkuYXR0cignaGVpZ2h0JywgcC5saW5lX2hlaWdodCkuY3NzKCd0ZXh0LWFsaWduJywgJ2NlbnRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSAkKCc8ZGl2Lz4nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBwLmxpbmVfaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JzogcC5saW5lX2hlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3RoY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0aGNoID0gJCgnPGlucHV0IHR5cGU9XCJyYWRpb1wiIC8+JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCduYW1lJywgcC5zZWxlY3RvciArICdfc2luZ2xlXycgKyAocC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdGhjaCA9ICQoJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIi8+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtID0gKHAubGluZV9oZWlnaHQgLSAxMykgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0aGNoLmNzcyh7J21hcmdpbic6IG19KS5hZGRDbGFzcygnQm9keUNoZWNrQm94Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGlvRGl2ID0gJChcIjxkaXYvPlwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIjogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGVmdFwiOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIjogXCIwXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kKHJhZGlvRGl2KS5hcHBlbmQoY3RoY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRkLmFwcGVuZChkaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hcHBlbmQodGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHAuZXhwYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRkID0gJCgnPHRkLz4nKS5hZGRDbGFzcygnbm9SZXNpemUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBwLmxpbmVfaGVpZ2h0KS5hZGRDbGFzcygnRXhwYW5kQm94JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHAubGluZV9oZWlnaHQpLmNzcygndGV4dC1hbGlnbicsICdjZW50ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGl2ID0gJCgnPGRpdi8+JykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogcC5saW5lX2hlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2hlaWdodCc6IHAubGluZV9oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LmFkZENsYXNzKCdCb2R5RXhwYW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGQuYXBwZW5kKGRpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFwcGVuZCh0ZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gocC5jb2xNb2RlbENvcHksIGZ1bmN0aW9uIChpLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRkID0gJChcIjx0ZC8+XCIpLmFkZENsYXNzKCdHcmlkSXRlbScpLmF0dHIoJ2RhdGEtd2lkdGgnLCB0LndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGl2ID0gJChcIjxkaXYvPlwiKS5hdHRyKCduYW1lJywgdC5uYW1lKS5hZGRDbGFzcygnQm9keVRkQ29udGVudCcpLmF0dHIoJ2RhdGEtZGlzcGxheScsIHQuZGlzcGxheSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQtb3ZlcmZsb3cnOiAnZWxsaXBzaXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3doaXRlLXNwYWNlJzogJ25vd3JhcCdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHcgPSBnLmNhbFdpZHRoKHQud2lkdGgsIHJjb2xzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPSBwLmNvbE1vZGVsQ29weS5sZW5ndGggLSAxKSB7IC8vIFRPRE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGQuYXR0cignd2lkdGgnLCB3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90ZC5jc3MoJ3dpZHRoJywgdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5yZXNpemFibGUgPyB0ZC5hZGRDbGFzcygnbGFzdEl0ZW0nKSA6IHRkLmF0dHIoJ3dpZHRoJywgdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGl2LmNzcygnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGQuYXBwZW5kKGRpdik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHQuY3NzICYmIGRpdi5jc3ModC5jc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRkLmNzcygndGV4dC1hbGlnbicsIHQuYWxpZ24gfHwgcC5hbGlnbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQudHlwZSA9PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkLmh0bWwoXCI8ZGl2IGNsYXNzPSd0clBpY3R1cmUnPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuaGlkZSB8fCAocC5jb2x1bW5GaWx0ZXIgJiYgcC5jb2x1bW5GaWx0ZXIuaW5kZXhPZih0Lm5hbWUpID09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZC5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGQuYWRkQ2xhc3MoJ3Zpc2liaWxpdHknKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hcHBlbmQodGQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHAuaWRQcm9wZXJ0eSAmJiAkKCcuQm9keVRkQ29udGVudFtuYW1lPVwiJyArIHAuaWRQcm9wZXJ0eSArICdcIl0nLCB0ckNvbnRlbnQpLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmJlZm9yZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIjx0ZC8+XCIpLmFkZENsYXNzKCdHcmlkSXRlbSBoaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgkKFwiPGRpdi8+XCIpLmF0dHIoJ25hbWUnLCBwLmlkUHJvcGVydHkpLmFkZENsYXNzKCdCb2R5VGRDb250ZW50JykpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJDb250ZW50LmdldCgwKS5vdXRlckhUTUw7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjcmVhdGVSb3c6IGZ1bmN0aW9uIChyZWNvcmQsIGluZGV4LCB0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJUZW1wbGF0ZSA9ICQoJyMnICsgcC5ib2R5SUQpLmRhdGEocC53aG9sZUlEKTtcclxuICAgICAgICAgICAgICAgIGlmICghdHJUZW1wbGF0ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyQ29udGVudCA9ICQodHJUZW1wbGF0ZS5yZXBsYWNlKC9cXHtcXHsoaW5kZXgpXFx9XFx9L2csIGluZGV4KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJDb250ZW50LmFkZENsYXNzKGluZGV4ICUgMiA9PSAwID8gJ3NpbmdsZUxpbmUnIDogJ2RvdWJsZUxpbmUnKTtcclxuICAgICAgICAgICAgICAgIHRyQ29udGVudC5hZGRDbGFzcygnZGF0YWxpbmUnKTtcclxuICAgICAgICAgICAgICAgIHRyQ29udGVudC5kYXRhKCdyZWNvcmQnLCByZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgdHJDb250ZW50LmRhdGEoJ2luZGV4JywgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwLmV4cGFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSAkKCcuQm9keUV4cGFuZCcsIHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHJlY29yZFtwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkICYmIChwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGV2YWwoJ3JlY29yZC4nICsgKHAuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyAx44CB5b2T5YmN6KGM6auY5Lqu77yMIDLjgIHliLfmlrDooajmoLznmoTlk43lupTlkozlrrnlmajlpKflsI/lj5jljJblhbPns7tcclxuICAgICAgICAgICAgICAgICAgICBkaXYuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ0Rpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuZXhwYW5kSW5kZXggIT0gbnVsbCAmJiBwLmV4cGFuZEluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJveCA9ICQodCkuZmluZChcInRyLmNoaWxkX1wiICsgcC5leHBhbmRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3guaGFzQ2xhc3MoJ2V4cGFuZGVkJykgJiYgJC5pc0Z1bmN0aW9uKHAuZm9sZCkgJiYgcC5mb2xkKGJveCwgcC5leHBhbmRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50c1VudGlsKCd0cicpLnBhcmVudCgpLnNpYmxpbmdzKCcuY2hpbGQnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzVW50aWwoJ3RyJykucGFyZW50KCkuc2libGluZ3MoJ1tpbmRleF0nKS5yZW1vdmVDbGFzcygnaW50b0V4cGFuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHNVbnRpbCgndHInKS5wYXJlbnQoKS5zaWJsaW5ncygnW2luZGV4XScpLmZpbmQoJy5Cb2R5RXhwYW5kJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmV4cGFuZEluZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJleHBhbmRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5yZW1vdmVDbGFzcygnaW50b0V4cGFuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0KS5maW5kKFwidHJbaW5kZXg9J2NoaWxkJ11cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLmNsZWFyQXBwZW5kUm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmV4cGFuZEluZGV4ID0ga2V5IHx8IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzVW50aWwoJ3RyJykucGFyZW50KCkuc2libGluZ3MoJy5jaGlsZF8nICsgKGtleSB8fCBpbmRleCkpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImV4cGFuZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFkZENsYXNzKCdpbnRvRXhwYW5kJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGFuZEJveCA9ICQoJ2Rpdi5leHBhbmQtYm94JywgJCh0aGlzKS5wYXJlbnRzVW50aWwoJ3RyJykucGFyZW50KCkuc2libGluZ3MoJy5jaGlsZF8nICsgKGtleSB8fCBpbmRleCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2Rpdi5leHBhbmQtYm94JywgJCh0aGlzKS5wYXJlbnRzVW50aWwoJ3RyJykucGFyZW50KCkuc2libGluZ3MoJy5jaGlsZCcpKS5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5jbGVhckFwcGVuZFJvdygpICYmICQuaXNGdW5jdGlvbihwLmV4cGFuZCkgJiYgcC5leHBhbmQocmVjb3JkLCBleHBhbmRCb3gsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLmV4cGFuZEluZGV4ID09IChrZXkgfHwgaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFkZENsYXNzKCdpbnRvRXhwYW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJZXhwYW5k5oyJ6ZKu5qCH6K6w5Ye95pWwLOaIluiAheWHveaVsOWIpOaWreW9k+WJjeihjOmcgOimgeWxleW8gFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24ocC5leHBhbmRGbGFnKSAmJiAhcC5leHBhbmRGbGFnKHJlY29yZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaciWV4cGFuZOaMiemSruemgeeUqOagh+iusOWHveaVsCzlubbkuJTlh73mlbDliKTmlq3lvZPliY3ooYzpnIDopoHnpoHnlKhcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHAuZXhwYW5kRGlzYWJsZUZsYWcpICYmIHAuZXhwYW5kRGlzYWJsZUZsYWcocmVjb3JkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaChwLmNvbE1vZGVsQ29weSwgZnVuY3Rpb24gKGksIHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IHJlY29yZFt0Lm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQgJiYgdC5uYW1lKSB2ID0gZXZhbCgncmVjb3JkLicgKyB0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaG93ID0gZy5oYW5kbGVEYXRhKHYpICsgZy5oYW5kbGVEYXRhKHRoaXMudW5pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpdiA9ICQoJy5Cb2R5VGRDb250ZW50W25hbWU9XCInICsgdC5uYW1lICsgJ1wiXScsIHRyQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXYubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkaXYuaHRtbChzaG93LnJlcGxhY2VIVE1MQ2hhcigpLnJlcGxhY2VJbGxlZ2FsQ2hhcigpLnJlcGxhY2UoL+OAjC9nLCAnWycpLnJlcGxhY2UoL+OAjS9nLCAnXScpKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYucGFyZW50KCkuYXR0cigndGl0bGUnLCBzaG93LnJlcGxhY2VIVE1MQ2hhcigpLnJlcGxhY2UoL+OAjC9nLCAnWycpLnJlcGxhY2UoL+OAjS9nLCAnXScpKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuYXR0cigndmFsdWUnLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuZGF0YSgndmFsdWUnLCB2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuZm5Jbml0ICYmICQuaXNGdW5jdGlvbih0LmZuSW5pdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNlbGwgPSAkKCcuQm9keVRkQ29udGVudFtuYW1lPVwiJyArIHQubmFtZSArICdcIl1bZGF0YS1kaXNwbGF5PVwiJyArIHQuZGlzcGxheSArICdcIl0nLCB0ckNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmRhdGEoJ2ZuSW5pdCcsIHQuZm5Jbml0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHQuZm5Jbml0KGNlbGwsIHYsIHJlY29yZCwgaW5kZXgsIHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRbdC5uYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5hdHRyKCd2YWx1ZScsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuZGF0YSgndmFsdWUnLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmF0dHIoJ3RpdGxlJywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2LnBhcmVudCgpLmF0dHIoJ3RpdGxlJyx2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ckNvbnRlbnQuZGF0YSgncmVjb3JkJywgcmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnLm1hcC5jb250YWlucyhyZWNvcmRbcC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcubWFwLnB1dChyZWNvcmRbcC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWVdLCByZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJDb250ZW50LmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBnLnNpbmdsZUNsaWNrQm9keUxpbmUodHJDb250ZW50LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRyQ29udGVudC5kYmxjbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZy5kb3VibGVDbGlja0JvZHlMaW5lKHRyQ29udGVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChwLmNsaWNrU2VsZWN0ICYmIHAuaXNTaG93U2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLkJvZHlDaGVja0JveCcsIHRyQ29udGVudCkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ckNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjcmVhdGVSb3dzOiBmdW5jdGlvbiAoY29udGV4dCwgZGF0YUxpc3QsIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS50aW1lKCdjcmVhdGVSb3dzJyk7XHJcbiAgICAgICAgICAgIFx0aWYoIWcuaW5kZXhNYXAgfHwgdHlwZSAhPSBcInN1YnNldFwiKSBnLmluZGV4TWFwID0ge307XHJcbiAgICAgICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGRhdGFMaXN0LCBmdW5jdGlvbiAoaSwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ckNvbnRlbnQgPSBnLmNyZWF0ZVJvdyh0LCBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwic3Vic2V0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodHJDb250ZW50KS5hdHRyKFwiaW5kZXhcIiwgXCJzdWJzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRyQ29udGVudCkucmVtb3ZlQ2xhc3MoJ3NpbmdsZUxpbmUnKS5yZW1vdmVDbGFzcygnZG91YmxlTGluZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0ckNvbnRlbnQpLmFkZENsYXNzKGkgJSAyID09IDAgPyAnc2luZ2xlTGluZScgOiAnZG91YmxlTGluZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyrliqjmgIHliKTmlq3mmK/lkKbpnIDopoHmmL7npLpjaGVja2JveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuaXNGdW5jdGlvbihwLmNoZWNrYm94RmxhZykgJiYgIXAuY2hlY2tib3hGbGFnKHRoaXMpICYmICQodHJDb250ZW50KS5maW5kKFwiLm5vUmVzaXplIGlucHV0W3R5cGU9J2NoZWNrYm94J11cIikuY3NzKFwidmlzaWJpbGl0eVwiLFwiaGlkZGVuXCIpOyovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmFmdGVyKHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0Zy5pbmRleE1hcFt0W3AuaWRQcm9wZXJ0eV1dID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYXBwZW5kKHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmV4cGFuZCAmJiBjb250ZXh0LmFwcGVuZChnLmNyZWF0ZUV4cGFuZEJveCh0LCBpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRmZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUudGltZUVuZCgnY3JlYXRlUm93cycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5re75Yqg6KGo5qC85Li75L2T5YaF5a655Y2V5YWD5qC85pWw5o2uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBhZGREYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUudGltZSgnYWRkRGF0YScpO1xyXG4gICAgICAgICAgICAgICAgZy5leHBhbmRDb2xNb2RlbCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhYmxlQ29udGVudCA9ICQoJ3RhYmxlJywgJyMnICsgcC5ib2R5SUQpLmVxKDApO1xyXG4gICAgICAgICAgICAgICAgdGFibGVDb250ZW50LmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGZkID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLmRhdGEubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuaXNTaG93Tm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJDb250ZW50ID0gJChcIjx0ci8+XCIpLmNzcyh7J2hlaWdodCc6IHAubGluZV9oZWlnaHR9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hcHBlbmQoJChcIjx0ZC8+XCIpLmF0dHIoJ2NvbHNwYW4nLCAocC5jbGlja1NlbGVjdCAmJiBwLmlzU2hvd1NlbGVjdCkgPyBwLmNvbF9udW0gKyAxIDogcC5jb2xfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RleHQtYWxpZ24nLCAnY2VudGVyJykuaHRtbChNc2cucmVwb3J0VG9vbC50YWJsZVs4XSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDb250ZW50LmFwcGVuZCh0ckNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBwLmJvZHlJRCkuY3NzKCdtYXJnaW4tdG9wJywgJy0xcHgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZmQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLm92ZXJmbG93ICYmIHAuZGF0YS5sZW5ndGggKiBwLmxpbmVfaGVpZ2h0ID4gcC5tYXhfaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAuaGVhZGVySUQgKyAnIC53cmFwcGVyJykuY3NzKHsnd2lkdGgnOiBcIjEwMCVcIn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFwLnNpbmdhbExpbmVIZWFkZXJUYWJsZSAmJiBnLmNyZWF0ZU1pdGxIZWFkZUxheW91dFRSKHRhYmxlQ29udGVudCwgcC5jb2xNb2RlbENvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLmNyZWF0ZVJvd3ModGFibGVDb250ZW50LCBwLmRhdGEpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGZkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZmQucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcC5kYXRhIHx8ICEocC5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyKCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZy5yZXNpemVCb3goKTtcclxuICAgICAgICAgICAgICAgICAgICBnLmxvYWRTdWNjZXNzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE1lbnUuaGFzRWxlbWVudFJpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBodHJzID0gJCgnIycgKyBwLmhlYWRlcklEKS5maW5kKCd0cjpub3QoLmNoaWxkKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBidHJzID0gJCgnIycgKyBwLmJvZHlJRCkuZmluZCgndHI6bm90KC5jaGlsZCknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAub25Mb2FkUmVhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5vbkxvYWRSZWFkeShwLmRhdGEsIGJ0cnMsIGh0cnMsIHAudG90YWxSZWNvcmRzLGcuaW5kZXhNYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5pc1NlYXJjaFJlY29yZFNlbGVjdGVkIHx8IHAuaXNSZWNvcmRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGcubWFwLmdldEtleXMoKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2ID0gcC5kYXRhW2ldW3AuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQgJiYgKHAuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gZXZhbCgncC5kYXRhW2ldLicgKyAocC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMuY29udGFpbnModikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGJ0cnNbaV0pLmFkZENsYXNzKCdTZWxlY3RlZEJvZHlMaW5lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5pc1Nob3dTZWxlY3QgJiYgKCQoYnRyc1tpXSkuZmluZCgnLkJvZHlDaGVja0JveCcpWzBdLmNoZWNrZWQgPSB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtICYmIG51bSA9PSBwLmRhdGEubGVuZ3RoICYmICFwLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChodHJzKS5hZGRDbGFzcygnU2VsZWN0ZWRIZWFkZXJMaW5lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmlzU2hvd1NlbGVjdCAmJiAoJChodHJzKS5maW5kKCcuSGVhZGVyQ2hlY2tCb3gnKVswXS5jaGVja2VkID0gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLnRpbWVFbmQoJ2FkZERhdGEnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOWIm+W7uuWxleW8gOWGheWuuVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gcmVjb3JkXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBpXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfGpRdWVyeX1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNyZWF0ZUV4cGFuZEJveDogZnVuY3Rpb24gKHJlY29yZCwgaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcmVjb3JkW3AuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkICYmIChwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBldmFsKCdyZWNvcmQuJyArIChwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyQ29udGVudCA9ICQoXCI8dHIvPlwiKS5hZGRDbGFzcygnY2hpbGQgY2hpbGRfJyArIChpbmRleCB8fCBpKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sc3BhbiA9IHAuY29sX251bSArIDE7XHJcbiAgICAgICAgICAgICAgICAocC5jbGlja1NlbGVjdCAmJiBwLmlzU2hvd1NlbGVjdCkgJiYgY29sc3BhbisrO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRkQ29udGVudCA9ICQoXCI8dGQvPlwiKS5hdHRyKCdjb2xzcGFuJywgY29sc3Bhbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9ICQoXCI8ZGl2Lz5cIikuYWRkQ2xhc3MoJ2V4cGFuZC1ib3gnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOiBwLmV4cGFuZEJveEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAnbWluLWhlaWdodCc6IHAubGluZV9oZWlnaHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRkQ29udGVudC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB0ckNvbnRlbnQuYXBwZW5kKHRkQ29udGVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHAuZXhwYW5kSW5kZXggPT0gKGluZGV4IHx8IGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuaXNGdW5jdGlvbihwLmV4cGFuZCkgJiYgcC5leHBhbmQocmVjb3JkLCBjb250ZW50LCBpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJDb250ZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5a+55Y2V5YWD5qC85pWw5o2u6L+b6KGM54m55q6K5aSE55CGXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBoYW5kbGVEYXRhOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDljZXlh7vooajmoLzlpLTooYznmoTlpITnkIblh73mlbBcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNpbmdsZUNsaWNrSGVhZGVyTGluZTogZnVuY3Rpb24gKHRyQ29udGVudCwgZG91YmxlQ2xpY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghcC5jbGlja1NlbGVjdCB8fCBwLnNpbmdsZVNlbGVjdCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrYm94ID0gdHJDb250ZW50LmZpbmQoJy5IZWFkZXJDaGVja0JveCcpWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvdWJsZUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmFkZENsYXNzKCdTZWxlY3RlZEhlYWRlckxpbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LnRvZ2dsZUNsYXNzKCdTZWxlY3RlZEhlYWRlckxpbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gY2hlY2tib3guY2hlY2tlZCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHJDb250ZW50Lmhhc0NsYXNzKCdTZWxlY3RlZEhlYWRlckxpbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5ib2R5SUQgKyAnLkdyaWRUYWJsZUJvZHlEaXYgdHI6bm90KC5jaGlsZCknKS5lYWNoKGZ1bmN0aW9uIChpLCByb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZy5zaW5nbGVDbGlja0JvZHlMaW5lKCQocm93KSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5ib2R5SUQgKyAnLkdyaWRUYWJsZUJvZHlEaXYgdHI6bm90KC5jaGlsZCknKS5lYWNoKGZ1bmN0aW9uIChpLCByb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZy5zaW5nbGVDbGlja0JvZHlMaW5lKCQocm93KSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Y+M5Ye76KGo5qC85aS06KGM55qE5aSE55CG5Ye95pWwXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkb3VibGVDbGlja0hlYWRlckxpbmU6IGZ1bmN0aW9uICh0ckNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGcuc2luZ2xlQ2xpY2tIZWFkZXJMaW5lKHRyQ29udGVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDljZXlh7vooajmoLzkuLvkvZPooYznmoTlpITnkIblh73mlbBcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHRyQ29udGVudCDmk43kvZzooYxcclxuICAgICAgICAgICAgICogQHBhcmFtIGRvdWJsZUNsaWNrIOaYr+WQpuaYr+WPjOWHu+aTjeS9nFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2luZ2xlQ2xpY2tCb2R5TGluZTogZnVuY3Rpb24gKHRyQ29udGVudCwgZG91YmxlQ2xpY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghcC5jbGlja1NlbGVjdCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHAuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZy5tYXAuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0ckNvbnRlbnQuc2libGluZ3MoKS5lYWNoKGZ1bmN0aW9uIChpLCByb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChyb3cpLnJlbW92ZUNsYXNzKCdTZWxlY3RlZEJvZHlMaW5lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tib3ggPSB0ckNvbnRlbnQuZmluZCgnLkJvZHlDaGVja0JveCcpWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvdWJsZUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC5hZGRDbGFzcygnU2VsZWN0ZWRCb2R5TGluZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocC5zaW5nbGVTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0ckNvbnRlbnQuaGFzQ2xhc3MoJ1NlbGVjdGVkQm9keUxpbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ckNvbnRlbnQudG9nZ2xlQ2xhc3MoJ1NlbGVjdGVkQm9keUxpbmUnLCAhY2hlY2tib3guY2hlY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyQ29udGVudC50b2dnbGVDbGFzcygnU2VsZWN0ZWRCb2R5TGluZScsICF0ckNvbnRlbnQuaGFzQ2xhc3MoJ1NlbGVjdGVkQm9keUxpbmUnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5vblNpbmdsZUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5vblNpbmdsZUNsaWNrKHRyQ29udGVudCwgZy5nZXREYXRhKHRyQ29udGVudCksIHRyQ29udGVudC5oYXNDbGFzcygnU2VsZWN0ZWRCb2R5TGluZScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGcuc3RvcmFnZVNlbGVjdGVkKHRyQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXAuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGh0cnMgPSAkKCcjJyArIHAuaGVhZGVySUQpLmZpbmQoJ3RyOm5vdCguY2hpbGQpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ0cnMgPSAkKCcjJyArIHAuYm9keUlEKS5maW5kKCd0ciB0ZC5ub1Jlc2l6ZSBpbnB1dC5Cb2R5Q2hlY2tCb3gnKTtcclxuLy8gICAgICAgICAgICAgICAgICAgIFx0JCgnIycgKyBwLmJvZHlJRCkuZmluZCgndHI6bm90KC5jaGlsZCknKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYnN0cnMgPSAkKCcuU2VsZWN0ZWRCb2R5TGluZScsICQoJyMnICsgcC5ib2R5SUQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnN0cnMubGVuZ3RoICYmIGJzdHJzLmxlbmd0aCA9PSBidHJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHJzLmFkZENsYXNzKCdTZWxlY3RlZEhlYWRlckxpbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRycy5maW5kKCcuSGVhZGVyQ2hlY2tCb3gnKVswXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodHJzLnJlbW92ZUNsYXNzKCdTZWxlY3RlZEhlYWRlckxpbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRycy5maW5kKCcuSGVhZGVyQ2hlY2tCb3gnKVswXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Y+M5Ye76KGo5qC85Li75L2T6KGM55qE5aSE55CG5Ye95pWwXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBkb3VibGVDbGlja0JvZHlMaW5lOiBmdW5jdGlvbiAodHJDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBnLnNpbmdsZUNsaWNrQm9keUxpbmUodHJDb250ZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChwLm9uRG91YmxlQ2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBwLm9uRG91YmxlQ2xpY2sodHJDb250ZW50LCBnLmdldERhdGEodHJDb250ZW50KSwgdHJDb250ZW50Lmhhc0NsYXNzKCdTZWxlY3RlZEJvZHlMaW5lJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6K6w5b2V6YCJ5Lit6aG5XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB0ckNvbnRlbnQg5pON5L2c6KGMXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdG9yYWdlU2VsZWN0ZWQ6IGZ1bmN0aW9uICh0ckNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBnLmdldERhdGEodHJDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ckNvbnRlbnQuaGFzQ2xhc3MoJ1NlbGVjdGVkQm9keUxpbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGcubWFwLnB1dChyZWNvcmRbcC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWVdLCByZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZy5tYXAucmVtb3ZlKHJlY29yZFtwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcC5zaG93U2VsZWN0ZWROYW1lICYmIGcucmVmcmVzaFNlbGVjdGVkU2hvd0JveCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Yi35paw6YCJ5Lit6aG55bGV56S65qGGXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICByZWZyZXNoU2VsZWN0ZWRTaG93Qm94OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0ZWRTaG93Qm94JywgJCh0KSkuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBnLm1hcC5nZXRWYWx1ZXMoKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHZhbHVlc1tpXVtwLnNob3dTZWxlY3RlZE5hbWUgfHwgbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHZhbHVlc1tpXVtuYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKCc8bGk+JykuYXR0cigndGl0bGUnLCB0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmQoJCgnPGRpdj4nKS5hZGRDbGFzcygndCcpLnRleHQodGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZCgkKCc8ZGl2Png8L2Rpdj4nKS5hZGRDbGFzcygnY2xvc2UnKS5jbGljaygoZnVuY3Rpb24gKGl0ZW0sIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5tYXAucmVtb3ZlKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnLmFkZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KShpdGVtLCBrZXkpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zZWxlY3RlZFNob3dCb3gnLCAkKHQpKS5hcHBlbmQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IHZhbHVlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5zZWxlY3RlZFNob3dCb3gnLCAkKHQpKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjbGVhclwiPjwvZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6YCJ5Lit6aG56K6w5b2VIEpTT04g5pWw5o2uIOKAlOKAlCDnsbtNYXDmk43kvZxcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIG1hcDoge1xyXG4gICAgICAgICAgICAgICAgcHV0OiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5zZWxlY3RlZFJlY29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAuc2VsZWN0ZWRSZWNvcmRzW2ldLmtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLnNlbGVjdGVkUmVjb3Jkc1tpXS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHAuc2VsZWN0ZWRSZWNvcmRzLnB1c2goeydrZXknOiBrZXksICd2YWx1ZSc6IHZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLnNlbGVjdGVkUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IHAuc2VsZWN0ZWRSZWNvcmRzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodi5rZXkpID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuc2VsZWN0ZWRSZWNvcmRzLnVuc2hpZnQodik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICog5piv5ZCm5YyF5ZCr5oyH5a6aIGtleSDnmoTlhYPntKBcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAuc2VsZWN0ZWRSZWNvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLnNlbGVjdGVkUmVjb3Jkc1tpXS5rZXkgPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdldEtleXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0QXJyID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLnNlbGVjdGVkUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IHAuc2VsZWN0ZWRSZWNvcmRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRBcnIucHVzaCh2LmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRBcnI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWVzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdEFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5zZWxlY3RlZFJlY29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBwLnNlbGVjdGVkUmVjb3Jkc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0QXJyLnB1c2godi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRBcnI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwLnNlbGVjdGVkUmVjb3JkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6I635Y+W6KGo5qC86KGM55qE5LiA6KGM5pWw5o2u77yM6L+U5ZueanNvbuagvOW8j1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24gKHRyQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IHRyQ29udGVudC5kYXRhKCdyZWNvcmQnKSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIHRyQ29udGVudC5maW5kKCcuQm9keVRkQ29udGVudCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQodGhpcykuZGF0YSgndmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRbJCh0aGlzKS5hdHRyKCduYW1lJyldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6K6+572u5Y2V5YWD5qC855qE5YC8XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBjZWxsIOaMh+WumuWNleWFg+agvFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gdmFsdWUg5YC8XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZXRDZWxsRGF0YTogZnVuY3Rpb24gKGNlbGwsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJDb250ZW50ID0gJChjZWxsKS5wYXJlbnRzKCd0cicpLmVxKDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGNlbGwpLmF0dHIoJ25hbWUnKTtcclxuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0ckNvbnRlbnQuZGF0YSgncmVjb3JkJykgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZuSW5pdCA9ICQoY2VsbCkuZGF0YSgnZm5Jbml0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm5Jbml0ICYmICQuaXNGdW5jdGlvbihmbkluaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm5Jbml0KCQoY2VsbCksIHZhbHVlLCByZWNvcmQsIHRyQ29udGVudC5kYXRhKCdpbmRleCcpLCB0ckNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJDb250ZW50LmRhdGEoJ3JlY29yZCcsIHJlY29yZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnLm1hcC5jb250YWlucyhyZWNvcmRbcC5pZFByb3BlcnR5IHx8IHAuY29sTW9kZWxDb3B5WzBdLm5hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLm1hcC5wdXQocmVjb3JkW3AuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lXSwgcmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChjZWxsKS5kYXRhKCd2YWx1ZScsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJChjZWxsKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOiuvue9ruafkOihjOeahOWAvFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gY2VsbCDmjIflrprljZXlhYPmoLxcclxuICAgICAgICAgICAgICogQHBhcmFtIHZhbHVlIOWAvFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2V0Um93RGF0YTpmdW5jdGlvbihyZWNvcmQsbnApe1xyXG4gICAgICAgICAgICBcdHZhciBpbmRleCA9IGcuaW5kZXhNYXBbcmVjb3JkW3AuaWRQcm9wZXJ0eV1dO1xyXG4gICAgICAgICAgICBcdGlmKCFpbmRleCAmJiBpbmRleCE9MCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBcdHZhciB0ckNvbnRlbnQgPSAkKCcjJyArIHAuYm9keUlEKS5maW5kKCd0cltpbmRleD0nICsgaW5kZXggKyAnXScpO1xyXG4gICAgICAgICAgICBcdCQuZWFjaChwLmNvbE1vZGVsLCBmdW5jdGlvbiAoaSwgdCkge1xyXG4gICAgICAgICAgICBcdFx0dmFyIG5hbWUgPSB0Lm5hbWU7XHJcbiAgICAgICAgICAgIFx0XHRpZihucCl7XHJcbiAgICAgICAgICAgIFx0XHRcdGlmKCgkLmlzQXJyYXkobnApICYmICQuaW5BcnJheShuYW1lLG5wKT49MCkgfHwgbnA9PW5hbWUpe1xyXG4gICAgICAgICAgICBcdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBcdFx0XHR9XHJcbiAgICAgICAgICAgIFx0XHR9XHJcbiAgICAgICAgICAgIFx0XHR2YXIgdmFsdWUgPSByZWNvcmRbbmFtZV07XHJcbiAgICAgICAgICAgIFx0XHR2YXIgY2VsbCA9IHRyQ29udGVudC5maW5kKCcuQm9keVRkQ29udGVudFtuYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZXEoMCk7XHJcbiAgICAgICAgICAgIFx0XHR2YXIgZm5Jbml0ID0gJChjZWxsKS5kYXRhKCdmbkluaXQnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm5Jbml0ICYmICQuaXNGdW5jdGlvbihmbkluaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuSW5pdCgkKGNlbGwpLCB2YWx1ZSwgcmVjb3JkLCB0ckNvbnRlbnQuZGF0YSgnaW5kZXgnKSwgdHJDb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gJChjZWxsKS5kYXRhKCd2YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9sZFZhbHVlIT12YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgXHQgJChjZWxsKS5hdHRyKCd2YWx1ZScsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBcdCAkKGNlbGwpLmRhdGEoJ3ZhbHVlJywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFx0ICQoY2VsbCkucGFyZW50KCd0aXRsZScsdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFx0dHJDb250ZW50LmRhdGEoJ3JlY29yZCcsIHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZy5tYXAuY29udGFpbnMocmVjb3JkW3AuaWRQcm9wZXJ0eSB8fCBwLmNvbE1vZGVsQ29weVswXS5uYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgZy5tYXAucHV0KHJlY29yZFtwLmlkUHJvcGVydHkgfHwgcC5jb2xNb2RlbENvcHlbMF0ubmFtZV0sIHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJDb250ZW50O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Yib5bu65YiG6aG15bel5YW35p2hXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBwYWdlQmFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBnLmFkZFRvb2xCYXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOa3u+WKoOihqOagvOWIhumhteW3peWFt+adoVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgYWRkVG9vbEJhcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJhckRpdiA9ICQoXCI8ZGl2IC8+XCIpO1xyXG4gICAgICAgICAgICAgICAgYmFyRGl2LmF0dHIoXCJpZFwiLCBwLnBhZ2VCYXJJRCk7XHJcbiAgICAgICAgICAgICAgICBiYXJEaXYuYXR0cihcImNsYXNzXCIsIFwiUGFnZVRvb2xCYXJcIik7XHJcbiAgICAgICAgICAgICAgICBiYXJEaXYuY3NzKHsnaGVpZ2h0JzogcC50b29sQmFySGVpZ2h0fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBwLnNlbGVjdG9yKS5hcHBlbmQoYmFyRGl2KTtcclxuICAgICAgICAgICAgICAgIHAudG9vbEJhciA9PSAnaGlkZScgPyBiYXJEaXYuaGlkZSgpIDogMDtcclxuICAgICAgICAgICAgICAgIGcuYWRkQmFyVGFibGUoYmFyRGl2KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOa3u+WKoOihqOagvOWIhumhteW3peWFt+adoeahhuaetlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgYWRkQmFyVGFibGU6IGZ1bmN0aW9uIChiYXJEaXYpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YWJsZUNvbnRlbnQgPSAkKFwiPGRpdi8+XCIpLmFkZENsYXNzKCdHcmlkVGFibGVCYXJCb2R5Jyk7XHJcbiAgICAgICAgICAgICAgICBiYXJEaXYuYXBwZW5kKHRhYmxlQ29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBnLmFkZFRvb2xCYXJDb250ZW50KHRhYmxlQ29udGVudCwgJ0xlZnQnKTtcclxuICAgICAgICAgICAgICAgIGcuYWRkVG9vbEJhckNvbnRlbnQodGFibGVDb250ZW50LCAnUmlnaHQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOa3u+WKoOihqOagvOWIhumhteW3peWFt+adoeS4reeahOWFt+S9k+WGheWuuVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgYWRkVG9vbEJhckNvbnRlbnQ6IGZ1bmN0aW9uICh0ckJhckNvbnRlbnQsIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ24gPSAnJztcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdMZWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBwLmxlZnRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduID0gXCJsZWZ0XCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ1JpZ2h0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBwLnJpZ2h0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbiA9IFwicmlnaHRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBwYW4gPSAkKCc8cC8+JykuY3NzKCdmbG9hdCcsIGFsaWduKS5hZGRDbGFzcygnR3JpZFRhYmxlVG9vbEJhckJvZHknICsgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goY29udGVudCwgZnVuY3Rpb24gKGluZGV4LCBkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJChcIjxcIiArIGQuaW5wdXQgKyBcIiAvPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBkLm5hbWUgJiYgaW5wdXQuYXR0cignY2xhc3MnLCBkLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhbi5hcHBlbmQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGQuaWRzICYmIGlucHV0LmF0dHIoJ2lkJywgcC5wYWdlQmFySUQgKyBkLmlkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQudHlwZSA9PSAnbGFiZWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmZpeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKHsnd2hpdGUtc3BhY2UnOiAnbm93cmFwJywgJ3RleHQtb3ZlcmZsb3cnOiAnZWxsaXBzaXMnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnNob3cgJiYgaW5wdXQuaHRtbChkLnNob3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5zaG93ICYmIGlucHV0Lmh0bWwocFt0aGlzLnNob3ddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoJ3NpemUnLCAnNCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkLnR5cGUgPT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC53aWR0aCAmJiBpbnB1dC5jc3Moe1wid2lkdGhcIjogZC53aWR0aH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhlaWdodCAmJiBpbnB1dC5jc3Moe1wiaGVpZ2h0XCI6IGQuaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcFtkLnNob3ddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcHRpb24gPSAkKFwiPG9wdGlvbiAvPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbChkYXRhW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi5odG1sKGRhdGFbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGQudHlwZSA9PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC53aWR0aCAmJiBpbnB1dC5jc3Moe1wid2lkdGhcIjogZC53aWR0aH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhlaWdodCAmJiBpbnB1dC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogZC5oZWlnaHQsIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLnNob3cgJiYgaW5wdXQudmFsKHBbZC5zaG93XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkLnR5cGUgPT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hZGRDbGFzcyhcInBidXR0b25fb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuc2hvdyAmJiBpbnB1dC52YWwocFtkLnNob3ddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC53aWR0aCAmJiBpbnB1dC5jc3Moe1wid2lkdGhcIjogZC53aWR0aH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhlaWdodCAmJiBpbnB1dC5jc3Moe1wiaGVpZ2h0XCI6IGQuaGVpZ2h0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXYgPSAkKFwiPGRpdi8+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmlkcyAmJiBkaXYuYXR0cihcImNsYXNzXCIsIGQuaWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZC53aWR0aCAmJiBkaXYuY3NzKHtcIndpZHRoXCI6ICcxMDAlJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhlaWdodCAmJiBkaXYuY3NzKHtcImhlaWdodFwiOiAnMTAwJSd9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuYXBwZW5kKGRpdi50ZXh0KGQuc2hvdykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkLmxlZnQgJiYgaW5wdXQuYmVmb3JlKCQoXCI8bGFiZWwvPlwiKS5jc3MoXCJ3aWR0aFwiLCBkLmxlZnQpKTtcclxuICAgICAgICAgICAgICAgICAgICBkLnJpZ2h0ICYmIGlucHV0LmFmdGVyKCQoXCI8bGFiZWwvPlwiKS5jc3MoXCJ3aWR0aFwiLCBkLnJpZ2h0KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRyQmFyQ29udGVudC5hcHBlbmQocGFuKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOa3u+WKoOihqOagvOWIhumhteW3peWFt+adoeS4reeahOS6i+S7tuWTjeW6lFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBwLnBhZ2VCYXJJRCArIFwicHNlbGVjdF9ycHNcIikuY2hhbmdlKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5ycCA9IHAucnBzW2RhdGEuZGVsZWdhdGVUYXJnZXQuc2VsZWN0ZWRJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgZy5yZWZyZXNoUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwYnV0dG9uX2ZpcnN0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5jdXJyZW50UGFnZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLnJlZnJlc2hQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwYnV0dG9uX3ByZXZpb3VzXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5jdXJyZW50UGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5jdXJyZW50UGFnZSAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLnJlZnJlc2hQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwYnV0dG9uX25leHRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLmN1cnJlbnRQYWdlIDwgcC50b3RhbFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5jdXJyZW50UGFnZSA9IHBhcnNlSW50KHAuY3VycmVudFBhZ2UpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZy5yZWZyZXNoUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBwLnBhZ2VCYXJJRCArIFwicGJ1dHRvbl9sYXN0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocC5jdXJyZW50UGFnZSAhPSBwLnRvdGFsUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLmN1cnJlbnRQYWdlID0gcC50b3RhbFBhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcucmVmcmVzaFBhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInB0ZXh0X3RvUGFnZVwiKS5rZXlkb3duKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuanVtcFRvUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJCgnIycgKyBwLnBhZ2VCYXJJRCArIFwicGJ1dHRvbl9qdW1wVG9cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGcuanVtcFRvUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnLmluaXRUb29sQmFyU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBnb+aMiemSrui3s+i9rOWHveaVsFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAganVtcFRvUGFnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZyA9IC9eWzAtOV0qWzEtOV1bMC05XSokLztcclxuICAgICAgICAgICAgICAgIHZhciBwYWdlUyA9ICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInB0ZXh0X3RvUGFnZVwiKS52YWwoKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWcudGVzdChwYWdlUykpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUyA9IHBhcnNlSW50KHBhZ2VTKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFnZVMgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VTID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2VTID4gcC50b3RhbFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVMgPSBwLnRvdGFsUGFnZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2VTID09IHAuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBwLnBhZ2VCYXJJRCArIFwicHRleHRfdG9QYWdlXCIpLnZhbChwLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwLmN1cnJlbnRQYWdlID0gcGFnZVM7XHJcbiAgICAgICAgICAgICAgICBnLnJlZnJlc2hQYWdlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliJ3lp4vljJbooajmoLzliIbpobXlt6XlhbfmnaHkuK3nmoRzZWxlY3TmlbDmja5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGluaXRUb29sQmFyU2VsZWN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBwLnJwcy5pbmRleE9mKHAucnApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwc2VsZWN0X3Jwc1wiICsgJyBvcHRpb246ZXEoJyArIGluZGV4ICsgJyknKS5hdHRyKCdzZWxlY3RlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHAucnAgPSBwLnJwc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDliLfmlrDooajmoLzmlbTkvZPlhoXlrrlcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlZnJlc2hQYWdlOiBmdW5jdGlvbiAoZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGYgfHwgIXAuaXNSZWNvcmRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGcubWFwLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnLmNoYW5nZVRvb2xCYXJCdXR0b25TdHN0dXMoKTtcclxuICAgICAgICAgICAgICAgIGcuY2hhbmdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goJCgnIycgKyBwLmhlYWRlcklEICsgJyAuR3JpZFRhYmxlSGVhZGVyVEgnKSwgZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRbMF0uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdTZWxlY3RlZEhlYWRlckxpbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF90b3RhbFJlY29yZHNcIikuaHRtbChNc2cuZ3JpZFBhcmFtLnByb2NNc2cpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHAudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5odHRwLmFqYXgocC51cmwsIHAucGFyYW1zLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFx0aWYgKHAubG9hZFJlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRhID0gcC5sb2FkUmVhZHkoZGF0YS5kYXRhKSB8fCBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC50b3RhbFJlY29yZHMgPSBkYXRhLmRhdGFbcC50b3RhbF0gPyBkYXRhLmRhdGFbcC50b3RhbF0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZGF0YSA9IGRhdGEuZGF0YVtwLmxpc3RdID8gZGF0YS5kYXRhW3AubGlzdF0gOiBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBwLnBhZ2VCYXJJRCArIFwicGxhYmVsX3RvdGFsUmVjb3Jkc1wiKS5odG1sKE1zZy5ncmlkUGFyYW0uZW1wdHlNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAudG90YWxSZWNvcmRzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF90b3RhbFJlY29yZHNcIikuaHRtbChNc2cuZ3JpZFBhcmFtLmVtcHR5TXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLmxvYWRFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAubG9hZEVycm9yKGRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLnRvdGFsUmVjb3JkcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmRhdGEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuYWRkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF90b3RhbFJlY29yZHNcIikuaHRtbChNc2cuZ3JpZFBhcmFtLmVtcHR5TXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAubG9hZEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmxvYWRFcnJvcihkYXRhLmRhdGEgfHwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcC50b3RhbFJlY29yZHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLmRhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZy5hZGREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHAucHJvdG90eXBlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5saXN0ID0gcC5wcm90b3R5cGVEYXRhLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcC50b3RhbCA9IHRlbXAubGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmRhdGEgPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAubG9hZFJlYWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmRhdGEgPSBwLmxvYWRSZWFkeShkYXRhLmRhdGEpIHx8IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRvdGFsUmVjb3JkcyA9IGRhdGEuZGF0YVtwLnRvdGFsXSA/IGRhdGEuZGF0YVtwLnRvdGFsXSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAuZGF0YSA9IGRhdGEuZGF0YVtwLmxpc3RdID8gZGF0YS5kYXRhW3AubGlzdF0gOiBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwbGFiZWxfdG90YWxSZWNvcmRzXCIpLmh0bWwoTXNnLmdyaWRQYXJhbS5lbXB0eU1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudG90YWxSZWNvcmRzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5kYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwLnByb3RvdHlwZVNvcnQgJiYgJC5pc0Z1bmN0aW9uKHAucHJvdG90eXBlU29ydCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC5kYXRhLnNvcnQocC5wcm90b3R5cGVTb3J0KHAucGFyYW1zWydvcmRlckJ5J10sIHAucGFyYW1zWydzb3J0J10pKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwLmRhdGEgPSBwLmRhdGEuc2xpY2UoKHAuY3VycmVudFBhZ2UgLSAxKSAqIHAucnAsIHAucnAgKiBwLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBnLmFkZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLnRvdGFsUmVjb3JkcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwbGFiZWxfdG90YWxSZWNvcmRzXCIpLmh0bWwoTXNnLmdyaWRQYXJhbS5lbXB0eU1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwbGFiZWxfdG90YWxSZWNvcmRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoU3RyaW5nLmZvcm1hdChNc2cuZ3JpZFBhcmFtLmRpc3BsYXlNc2csIHAudG90YWxSZWNvcmRzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5ZCO5Y+w5pWw5o2u6I635Y+W5oiQ5Yqf77yM55qE5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2FkU3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcC50b3RhbFBhZ2UgPSBNYXRoLmNlaWwocC50b3RhbFJlY29yZHMgLyBwLnJwKTtcclxuICAgICAgICAgICAgICAgIHAudG90YWxQYWdlID0gcC50b3RhbFBhZ2UgPyBwLnRvdGFsUGFnZSA6IDE7XHJcbiAgICAgICAgICAgICAgICBnLmNoYW5nZVRvb2xCYXJCdXR0b25TdHN0dXMoKTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF9jdXJyZW50UGFnZTFcIikuaHRtbChwLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF9jdXJyZW50UGFnZTJcIikuaHRtbChwLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF90b3RhbFBhZ2VcIikuaHRtbChwLnRvdGFsUGFnZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwdGV4dF90b1BhZ2VcIikudmFsKHAuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHAudG90YWxSZWNvcmRzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwbGFiZWxfdG90YWxSZWNvcmRzXCIpLmh0bWwoTXNnLmdyaWRQYXJhbS5lbXB0eU1zZyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBsYWJlbF90b3RhbFJlY29yZHNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoU3RyaW5nLmZvcm1hdChNc2cuZ3JpZFBhcmFtLmRpc3BsYXlNc2csIHAudG90YWxSZWNvcmRzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmoLnmja7lvZPliY3pobXlkozmgLvpobXmlbDmlLnlj5jlt6XlhbfmnaHmjInpkq7nirbmgIFcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNoYW5nZVRvb2xCYXJCdXR0b25TdHN0dXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoXCIucGJ1dHRvblwiLCBcIiNcIiArIHAucGFnZUJhcklEKS5hZGRDbGFzcyhcInBidXR0b25fb25cIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnBidXR0b25cIiwgXCIjXCIgKyBwLnBhZ2VCYXJJRCkucmVtb3ZlQ2xhc3MoXCJwYnV0dG9uX2Rpc1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwLmN1cnJlbnRQYWdlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwYnV0dG9uX2ZpcnN0XCIpLnJlbW92ZUNsYXNzKFwicGJ1dHRvbl9vblwiKS5hZGRDbGFzcyhcInBidXR0b25fZGlzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBidXR0b25fcHJldmlvdXNcIikucmVtb3ZlQ2xhc3MoXCJwYnV0dG9uX29uXCIpLmFkZENsYXNzKFwicGJ1dHRvbl9kaXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocC5jdXJyZW50UGFnZSA9PSBwLnRvdGFsUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgcC5wYWdlQmFySUQgKyBcInBidXR0b25fbmV4dFwiKS5yZW1vdmVDbGFzcyhcInBidXR0b25fb25cIikuYWRkQ2xhc3MoXCJwYnV0dG9uX2Rpc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjJyArIHAucGFnZUJhcklEICsgXCJwYnV0dG9uX2xhc3RcIikucmVtb3ZlQ2xhc3MoXCJwYnV0dG9uX29uXCIpLmFkZENsYXNzKFwicGJ1dHRvbl9kaXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDmr4/mrKHliLfmlrDliY3kv67mlLnlj4LmlbDlhoXlrrlcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGNoYW5nZVBhcmFtczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcC5wYXJhbXMucGFnZSA9IHAuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgICAgICBwLnBhcmFtcy5wYWdlU2l6ZSA9IHAucnA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBnLmluaXQoKTtcclxuICAgICAgICB0LmdyaWQgPSBnO1xyXG4gICAgICAgIHQucCA9IHA7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkb2NMb2FkZWQgPSBmYWxzZTtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2NMb2FkZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJC5mbi5leHRlbmQoe1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOe7mOWIti/liJ3lp4vljJYg6KGo5qC8XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR3JpZFRhYmxlOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZG9jTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkR3JpZCh0LCBwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkR3JpZCh0aGlzLCBwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5omp5bGV57uT54K55p+l6K+i5LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR3JpZFRhYmxlU2VhcmNoOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnAgPSAkLmV4dGVuZCh0aGlzLnAsIHApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcCAmJiBwLmRhdGEgPyB0aGlzLmdyaWQuYWRkRGF0YSgpIDogdGhpcy5ncmlkLnJlZnJlc2hQYWdlKCF0aGlzLnAuaXNTZWFyY2hSZWNvcmRTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgR3JpZFRhYmxlU2VhcmNocERhdGEgOiBmdW5jdGlvbihwKXtcclxuICAgICAgICBcdCByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMucCA9ICQuZXh0ZW5kKHRoaXMucCwgcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMucC5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5hZGREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bpgInkuK3orrDlvZXnmoRKU09O5Y6f5Z6L5qC85byPXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR3JpZFRhYmxlU2VsZWN0ZWRSZWNvcmRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZWNvcmRzID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzWzBdICYmIHRoaXNbMF0uZ3JpZClcclxuICAgICAgICAgICAgICAgIHJlY29yZHMgPSB0aGlzWzBdLmdyaWQubWFwLmdldFZhbHVlcygpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkcztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliJ3lp4vljJbpgInkuK3orrDlvZVcclxuICAgICAgICAgKi9cclxuICAgICAgICBHcmlkVGFibGVJbml0U2VsZWN0ZWRSZWNvcmRzOiBmdW5jdGlvbiAocmVjb3Jkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZyAmJiBnLmdyaWQgJiYgcmVjb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZWNvcmRzLCBmdW5jdGlvbiAobiwgdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLmdyaWQubWFwLnB1dCh0W2cucC5pZFByb3BlcnR5IHx8IGcucC5jb2xNb2RlbFswXS5uYW1lXSwgdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZy5ncmlkLnJlZnJlc2hTZWxlY3RlZFNob3dCb3goKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2cuZ3JpZC5hZGREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIt+aWsOihqOagvFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdyaWRUYWJsZVJlbG9hZDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkICYmIHApICQuZXh0ZW5kKHRoaXMucCwgcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnAudG90YWxSZWNvcmRzID0gMCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnAuY3VycmVudFBhZ2UgPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucC50b3RhbFBhZ2UgPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucC50b1BhZ2UgPSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5yZWZyZXNoUGFnZSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yi35paw6KGo5qC85Zyo5b2T5YmN6aG15LiN5YGa6aG16Z2i5Y+Y5pu0LuS9huaYr+afpeivouaYr+S4jeiDveaOieivpeaWueazleeahFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdyaWRUYWJsZVJlZnJlc2hQYWdlOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyaWQgJiYgcCkgJC5leHRlbmQodGhpcy5wLCBwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5yZWZyZXNoUGFnZSh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDmm7TmlrDkuYvliY3lrZjlgqjnmoTmn5DlsZ7mgKfnmoTlgLxcclxuICAgICAgICAqIHBuYW1lIOmcgOabtOaUueeahOWxnuaAp1xyXG4gICAgICAgICogcHZhbHVlIOmcgOabtOaUueeahOWxnuaAp+eahOWAvFxyXG4gICAgICAgICogaWRWYWx1ZSBpZFByb3BlcnR5IOeahOWAvFxyXG4gICAgICAgICogY2FsbGJhY2sg5Zue6LCD5pa55rOVXHJcbiAgICAgICAgKi9cclxuICAgICAgICBHcmlkVGFibGVVcGRhdGVPbmVQcm9wZXJ5OmZ1bmN0aW9uKHBuYW1lLHB2YWx1ZSxpZFZhbHVlLGNhbGxiYWNrKXtcclxuICAgICAgICBcdCByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzZWxmLmdyaWQuaW5kZXhNYXBbaWRWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goc2VsZi5wLmRhdGEsIGZ1bmN0aW9uIChpLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRbc2VsZi5wLmlkUHJvcGVydHkgfHwgc2VsZi5wLmNvbE1vZGVsWzBdLm5hbWVdID09IGlkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB2YXIgdHJDb250ZW50ID0gJCgnIycgKyBzZWxmLnAuYm9keUlEKS5maW5kKCd0cltpbmRleD0nICsgaW5kZXggKyAnXScpLmVxKDApO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gdHJDb250ZW50LmRhdGEoJ3JlY29yZCcpIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICByZWNvcmRbcG5hbWVdID0gcHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICB0ckNvbnRlbnQuZGF0YSgncmVjb3JkJywgcmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBjYWxsYmFjayh0ckNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmm7TmlrDmjIflrprljZXlhYPmoLznmoTlgLxcclxuICAgICAgICAgKiBAcGFyYW0gY2VsbCB7e2lkOiB7Kn0g5Y2V5YWD5qC85omA5Zyo6K6w5b2V55qEaWRQcm9wZXJ0eeWxnuaAp+eahOWAvCwgaW5kZXg6IHtudW1iZXJ9IOWNleWFg+agvOaJgOWcqOeahOihjOWPtywgbmFtZToge3N0cmluZ30g5Y2V5YWD5qC85omA5Zyo55qE5bGe5oCn5ZCNIH0gfCB7alF1ZXJ5fX1cclxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgICAgICAgKi9cclxuICAgICAgICBHcmlkVGFibGVVcGRhdGVDZWxsOiBmdW5jdGlvbiAoY2VsbCwgdmFsdWUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoY2VsbCBpbnN0YW5jZW9mIGpRdWVyeSkgfHwgISgodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnb2JqZWN0JykgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iai5ub2RlVHlwZSA9PT0gMSAmJiB0eXBlb2Ygb2JqLm5vZGVOYW1lID09PSAnc3RyaW5nJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBjZWxsLmluZGV4IHx8IHNlbGYuZ3JpZC5pbmRleE1hcFtjZWxsLmlkXSwgbmFtZSA9IGNlbGwubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goc2VsZi5wLmRhdGEsIGZ1bmN0aW9uIChpLCB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodFtzZWxmLnAuaWRQcm9wZXJ0eSB8fCBzZWxmLnAuY29sTW9kZWxbMF0ubmFtZV0gPT0gY2VsbC5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSAkKCcjJyArIHNlbGYucC5ib2R5SUQpLmZpbmQoJ3RyW2luZGV4PScgKyBpbmRleCArICddJykuZmluZCgnLkJvZHlUZENvbnRlbnRbbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5ncmlkLnNldENlbGxEYXRhKGNlbGwsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgY2FsbGJhY2soY2VsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pu05paw5b2T5YmN6KGo5qC855qE5YaF5a65IOacieS4quW/heWkh+adoeS7tiBpZFByb3BlcnR5IOW8gOWni+W/hemhu+mFjee9riDkuJTmraPnoa5cclxuICAgICAgICAgKiBAcGFyYW0gZGF0YSDljp/lp4vmlbDmja4gXHJcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR3JpZFRhYmxlVXBkYXRlUm93IDogZnVuY3Rpb24oZGF0YSxucCxjYWxsYmFjayl7XHJcbiAgICAgICAgXHQgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHRcdCB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgaWYoIWRhdGEgfHwgISQuaXNBcnJheShkYXRhKSApe1xyXG4gICAgICAgICAgICAgXHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgY2FsbGJhY2soZGF0YSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBcdCAkLmVhY2goZGF0YSxmdW5jdGlvbih0LGUpe1xyXG4gICAgICAgICAgICAgICAgXHRcdCBzZWxmLmdyaWQuc2V0Um93RGF0YShlLG5wKTtcclxuICAgICAgICAgICAgICAgICBcdCB9KTtcclxuICAgICAgICAgICAgICAgIFx0IGNhbGxiYWNrICYmIGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgY2FsbGJhY2soZGF0YSx0cnVlKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluW9k+WJjemhtemhteeggVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdyaWRUYWJsZUN1clBhZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGN1clBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpc1swXSAmJiB0aGlzWzBdLmdyaWQpXHJcbiAgICAgICAgICAgICAgICBjdXJQYWdlID0gdGhpc1swXS5ncmlkLnAuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJQYWdlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaWsOWinue7k+aehOebuOWQjOeahOihjCwgZXhwYW5k55qE5Y+m5LiA56eN5pa55byPXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgR3JpZFRhYmxlQXBwZW5kUm93OiBmdW5jdGlvbiAoaW5kZXgsIGRhdGFMaXN0KSB7XHJcbiAgICAgICAgICAgIHRoaXNbMF0uZ3JpZC5hcHBlbmRSb3coaW5kZXgsIGRhdGFMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gJDtcclxufSk7Il0sImZpbGUiOiJwbHVnaW5zL0dyaWRUYWJsZS9HcmlkVGFibGUuanMifQ==
