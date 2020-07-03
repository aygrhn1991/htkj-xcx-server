var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/user/user', {
            templateUrl: '/admin/user/user',
            controller: 'userCtrl'
        })
        .when('/user/admin', {
            templateUrl: '/admin/user/admin',
            controller: 'adminCtrl'
        })
        .when('/addjob/addjobrecord', {
            templateUrl: '/admin/addjob/addjobrecord',
            controller: 'addJobRecordCtrl'
        })
        .when('/addjob/addjobstatistic', {
            templateUrl: '/admin/addjob/addjobstatistic',
            controller: 'addJobStatisticCtrl'
        })
        .when('/produce/plan', {
            templateUrl: '/admin/produce/plan',
            controller: 'planCtrl'
        })
        .when('/welcome', {
            templateUrl: '/admin/welcome'
        })
        .when('/unauthorized', {
            templateUrl: '/error/unauthorized'
        })
        .otherwise({
            redirectTo: '/welcome'
        });
});
app.run(function ($rootScope, $http, $location) {
    var systemPage = ['#/welcome', '#/password'];
    $rootScope.getAdmin = function () {
        $http.post('/admin/getAdminAndPage').success(function (data) {
            $rootScope.admin = data.data.admin;
            window.Util.setCookie('admin', JSON.stringify(data.data.admin));
            $rootScope.menu = [];
            var set = new Set();
            data.data.page.forEach(function (x) {
                set.add(x.group_name);
            });
            Array.from(set).forEach(function (x) {
                var menu = {name: x, select: false, pages: []};
                data.data.page.forEach(function (y) {
                    if (y.group_name == x) {
                        menu.pages.push(y);
                    }
                })
                $rootScope.menu.push(menu);
            })
            layui.use('element', function () {
                var element = layui.element;
            });
            $rootScope.matchMenu();
            $rootScope.startListener();
        });
    };
    if (!window.Util.isNull(window.Util.getCookie('admin'))) {
        $rootScope.getAdmin();
    } else {
        window.location.href = '/admin/login';
    }
    $rootScope.matchMenu = function () {
        var hasPage = false;
        var path = '#' + $location.path();
        $rootScope.menu.forEach(function (x) {
            x.select = false;
            x.pages.forEach(function (y) {
                y.select = false;
                if (y.path == path) {
                    y.select = true;
                    x.select = true;
                    hasPage = true;
                }
            })
        })
        if (!hasPage) {
            for (var i = 0; i < systemPage.length; i++) {
                if (path == systemPage[i]) {
                    return;
                }
            }
            $location.path('/unauthorized');
        }
    };
    $rootScope.menuClick = function (e) {
        $rootScope.menu.forEach(function (x) {
            x.select = false;
        });
        e.select = true;
    };
    $rootScope.logout = function () {
        window.Util.removeCookie('admin');
        window.location.href = '/admin/login';
    };
    $rootScope.startListener = function () {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            $rootScope.matchMenu();
        });
    };
});
app.controller('userCtrl', function ($scope, $http) {
    $scope.state = [
        {id: -1, name: '全部'},
        {id: 1, name: '未审核'},
        {id: 2, name: '正常'},
        {id: 3, name: '禁用'},
    ];
    $scope.getDepartment = function () {
        $http.post('/api/common/getDepartment').success(function (data) {
            $scope.department = data.data;
            $scope.department.unshift({id: -1, name: '全部'});
        });
    };
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getUser', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
    };
    $scope.delete = function (e) {
        layer.confirm('此操作将拒绝员工认证', null, function () {
            $http.post(`/api/deleteUser/${e.id}`).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.editState = function (e, state) {
        layer.confirm('此操作将更改员工账号状态', null, function () {
            $http.post(`/api/updateUserState/${e.id}/${state}`).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.makePage = function (data) {
        layui.laypage.render({
            elem: 'page',
            count: data.count,
            curr: $scope.search.page,
            limit: $scope.search.limit,
            limits: [10, 20, 30, 40, 50],
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function (obj, first) {
                $scope.search.page = obj.curr;
                $scope.search.limit = obj.limit;
                if (!first) {
                    $scope.get();
                }
            }
        });
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.search.number1 = -1;
        $scope.search.number2 = -1;
        $scope.getDepartment();
        $scope.get();
    };
    $scope.reset();
});
app.controller('adminCtrl', function ($scope, $http) {
    $scope.state = [
        {id: -1, name: '全部'},
        {id: 2, name: '正常'},
        {id: 3, name: '禁用'},
    ];
    $scope.getDepartment = function () {
        $http.post('/api/common/getDepartment').success(function (data) {
            $scope.department = data.data;
            $scope.department.unshift({id: -1, name: '全部'});
        });
    };
    $scope.getUser = function () {
        $http.post('/api/common/getUser').success(function (data) {
            $scope.user = data.data;
        });
    };
    $scope.getPage = function () {
        $http.post('/api/common/getPage').success(function (data) {
            $scope.appPage = [];
            var set = new Set();
            data.data.app.forEach(function (x) {
                set.add(x.group_name);
            });
            Array.from(set).forEach(function (x) {
                var menu = {name: x, select: false, pages: []};
                data.data.app.forEach(function (y) {
                    if (y.group_name == x) {
                        menu.pages.push(y);
                    }
                })
                $scope.appPage.push(menu);
            });
            $scope.adminPage = [];
            var set = new Set();
            data.data.admin.forEach(function (x) {
                set.add(x.group_name);
            });
            Array.from(set).forEach(function (x) {
                var menu = {name: x, select: false, pages: []};
                data.data.admin.forEach(function (y) {
                    if (y.group_name == x) {
                        menu.pages.push(y);
                    }
                })
                $scope.adminPage.push(menu);
            });
        });
    };
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getAdmin', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
    };
    $scope.showAddModal = function () {
        $scope.lock = false;
        $scope.model = window.Util.copyObject($scope.pageModel);
        $scope.adminPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                y.select = false;
            })
        })
        $scope.appPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                y.select = false;
            })
        })
        $scope.index = layer.open({
            title: '添加管理员',
            type: 1,
            content: $('#modal'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.add = function () {
        if (window.Util.isNull($scope.model.userid)) {
            layer.msg('请选择一名员工');
            return;
        }
        $scope.model.appIds = [];
        $scope.appPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                if (y.select == true) {
                    $scope.model.appIds.push(y.id);
                }
            })
        });
        $scope.model.adminIds = [];
        $scope.adminPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                if (y.select == true) {
                    $scope.model.adminIds.push(y.id);
                }
            })
        });
        $http.post('/api/addAdmin', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditModal = function (e) {
        $http.post(`/api/getAdminPage/${e.userid}`).success(function (data) {
            $scope.appPage.forEach(function (x) {
                x.pages.forEach(function (y) {
                    if (data.data.app.filter(function (z) {
                        return z.page_id == y.id
                    }).length != 0) {
                        y.select = true;
                    } else {
                        y.select = false;
                    }
                })
            })
            $scope.adminPage.forEach(function (x) {
                x.pages.forEach(function (y) {
                    if (data.data.admin.filter(function (z) {
                        return z.page_id == y.id
                    }).length != 0) {
                        y.select = true;
                    } else {
                        y.select = false;
                    }
                })
            })
        });
        $scope.lock = true;
        $scope.model = e;
        $scope.index = layer.open({
            title: '修改管理员权限',
            type: 1,
            content: $('#modal'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.edit = function () {
        $scope.model.appIds = [];
        $scope.appPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                if (y.select == true) {
                    $scope.model.appIds.push(y.id);
                }
            })
        });
        $scope.model.adminIds = [];
        $scope.adminPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                if (y.select == true) {
                    $scope.model.adminIds.push(y.id);
                }
            })
        });
        $http.post('/api/updateAdminPage', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.closeModal = function () {
        layer.close($scope.index);
    };
    $scope.delete = function (e) {
        layer.confirm('此操作将删除管理员账号', null, function () {
            $http.post(`/api/deleteAdmin/${e.userid}`).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.editState = function (e, state) {
        layer.confirm('此操作将更改管理员账号状态', null, function () {
            $http.post(`/api/updateAdminState/${e.userid}/${state}`).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.resetPassword = function (e) {
        layer.confirm('此操作将重置管理员登录密码', null, function () {
            $http.post(`/api/updateAdminPassword/1/${e.userid}/123456`).success(function (data) {
                layer.msg(data.message);
            });
        });
    };
    $scope.makePage = function (data) {
        layui.laypage.render({
            elem: 'page',
            count: data.count,
            curr: $scope.search.page,
            limit: $scope.search.limit,
            limits: [10, 20, 30, 40, 50],
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function (obj, first) {
                $scope.search.page = obj.curr;
                $scope.search.limit = obj.limit;
                if (!first) {
                    $scope.get();
                }
            }
        });
    };
    $scope.pageModel = {
        userid: null,
        adminIds: [],
        appIds: [],
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.search.number1 = -1;
        $scope.search.number2 = -1;
        $scope.model = window.Util.copyObject($scope.pageModel);
        $scope.getDepartment();
        $scope.getUser();
        $scope.getPage();
        $scope.get();
    };
    $scope.reset();
});
app.controller('addJobRecordCtrl', function ($scope, $http) {
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getAddJobRecordOfDate', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
        $http.post(`/api/getAddJobRecordOfDateWithoutPage/${$scope.search.string1}`).success(function (data) {
            $scope.statistic = {
                userCount: 0,
                meal1Count: 0,
                meal2Count: 0,
                bus1Count: 0,
                bus2Count: 0,
                busToCount: 0,
            };
            data.data.forEach(function (x) {
                $scope.statistic.userCount++;
                if (x.meal == 1 && (x.meal_time == 1 || x.meal_time == 3)) {
                    $scope.statistic.meal1Count++;
                }
                if (x.meal == 1 && (x.meal_time == 2 || x.meal_time == 3)) {
                    $scope.statistic.meal2Count++;
                }
                if (x.bus == 1 && (x.bus_time == 1)) {
                    $scope.statistic.bus1Count++;
                }
                if (x.bus == 1 && (x.bus_time == 2)) {
                    $scope.statistic.bus2Count++;
                }
                if (x.bus_to == 1) {
                    $scope.statistic.busToCount++;
                }
            })
        });
    };
    $scope.makePage = function (data) {
        layui.laypage.render({
            elem: 'page',
            count: data.count,
            curr: $scope.search.page,
            limit: $scope.search.limit,
            limits: [10, 20, 30, 40, 50],
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function (obj, first) {
                $scope.search.page = obj.curr;
                $scope.search.limit = obj.limit;
                if (!first) {
                    $scope.get();
                }
            }
        });
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.search.string1 = window.Util.dateToYYYYMMDD(window.Util.addDay(new Date(), 1));
        $http.post('/api/getAddJobRecordAllDate').success(function (data) {
            var dateList = {};
            data.data.forEach(function (x) {
                dateList[x.date] = '';
            })
            layui.laydate.render({
                elem: '#date',
                value: $scope.search.string1 = window.Util.dateToYYYYMMDD(window.Util.addDay(new Date(), 1)),
                mark: dateList,
                done: function (value, date, endDate) {
                    $scope.search.string1 = value;
                }
            });
        })
        $scope.get();
    };
    $scope.reset();
});
app.controller('addJobStatisticCtrl', function ($scope, $http) {
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getAddJobRecordOfDateRange', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.statistic = {userCount: 0};
            $scope.data = data.data;
            $scope.statistic.userCount = data.count;
            $scope.makePage(data);
        });
    };
    $scope.makePage = function (data) {
        layui.laypage.render({
            elem: 'page',
            count: data.count,
            curr: $scope.search.page,
            limit: $scope.search.limit,
            limits: [10, 20, 30, 40, 50],
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function (obj, first) {
                $scope.search.page = obj.curr;
                $scope.search.limit = obj.limit;
                if (!first) {
                    $scope.get();
                }
            }
        });
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.search.string1 = window.Util.dateToYYYYMMDD(new Date());
        $scope.search.string2 = window.Util.dateToYYYYMMDD(new Date());
        layui.laydate.render({
            elem: '#date',
            range: true,
            value: $scope.search.string1 + ' - ' + $scope.search.string2,
            done: function (value, date, endDate) {
                $scope.search.string1 = value.split(' - ')[0];
                $scope.search.string2 = value.split(' - ')[1];
            }
        });
        $scope.get();
    };
    $scope.reset();
});
app.controller('planCtrl', function ($scope, $http) {
    $scope.line = ['D', 'X', 'P'];
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getPlan', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
    };
    $scope.showAddModal = function () {
        $scope.model = window.Util.copyObject($scope.pageModel);
        layui.laydate.render({
            elem: '#date',
            value: $scope.model.start_date = window.Util.dateToYYYYMMDD(new Date()),
            done: function (value, date, endDate) {
                $scope.model.start_date = value;
            }
        });
        $scope.index = layer.open({
            title: '添加生产计划',
            type: 1,
            content: $('#modal'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.add = function () {
        if (window.Util.isNull($scope.model.model) ||
            window.Util.isNull($scope.model.order) ||
            window.Util.isNull($scope.model.batch) ||
            window.Util.isNull($scope.model.line) ||
            window.Util.isNull($scope.model.card) ||
            window.Util.isNull($scope.model.count) || $scope.model.count == 0) {
            layer.msg('请完善生产计划信息');
            return;
        }
        $http.post('/api/addPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditModal = function (e) {
        $scope.model = e;
        layui.laydate.render({
            elem: '#date',
            value: e.start_date,
            done: function (value, date, endDate) {
                $scope.model.start_date = value;
            }
        });
        $scope.index = layer.open({
            title: '修改生产计划',
            type: 1,
            content: $('#modal'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.edit = function () {
        if (window.Util.isNull($scope.model.count) || $scope.model.count == 0) {
            layer.msg('请完善生产计划信息');
            return;
        }
        $http.post('/api/updatePlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showStepModal = function (e) {
        $scope.model = e;
        $scope.stepModel = {plan_id: e.id, step: null, message: null};
        $scope.index = layer.open({
            title: '生产计划进度更新',
            type: 1,
            content: $('#modal-step'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.editStep = function (next) {
        if ($scope.model.step == 0) {
            $scope.stepModel.step = 1;
        } else if ($scope.model.step == 1 || $scope.model.step == 10) {
            $scope.stepModel.step = next ? 2 : 10;
        } else if ($scope.model.step == 2 || $scope.model.step == 20) {
            $scope.stepModel.step = next ? 3 : 20;
        } else if ($scope.model.step == 3) {
            $scope.stepModel.step = 4;
        } else {
            $scope.stepModel.step = null;
        }
        $http.post('/api/updatePlanStep', $scope.stepModel).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.closeModal = function () {
        layer.close($scope.index);
    };
    $scope.delete = function (e) {
        layer.confirm('此操作将删除管理员账号', null, function () {
            $http.post(`/api/deleteAdmin/${e.userid}`).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.editState = function (e, state) {
        layer.confirm('此操作将更改管理员账号状态', null, function () {
            $http.post(`/api/updateAdminState/${e.userid}/${state}`).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.resetPassword = function (e) {
        layer.confirm('此操作将重置管理员登录密码', null, function () {
            $http.post(`/api/updateAdminPassword/1/${e.userid}/123456/-1`).success(function (data) {
                layer.msg(data.message);
            });
        });
    };
    $scope.makePage = function (data) {
        layui.laypage.render({
            elem: 'page',
            count: data.count,
            curr: $scope.search.page,
            limit: $scope.search.limit,
            limits: [10, 20, 30, 40, 50],
            layout: ['prev', 'page', 'next', 'count', 'limit'],
            jump: function (obj, first) {
                $scope.search.page = obj.curr;
                $scope.search.limit = obj.limit;
                if (!first) {
                    $scope.get();
                }
            }
        });
    };
    $scope.pageModel = {
        id: null,
        model: null,
        order: null,
        batch: null,
        line: null,
        card: null,
        count: null,
        start_date: null,
        mark: null,
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.model = window.Util.copyObject($scope.pageModel);
        $scope.get();
    };
    $scope.reset();
});