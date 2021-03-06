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
        .when('/produce/patchplan', {
            templateUrl: '/admin/produce/patchplan',
            controller: 'patchPlanCtrl'
        })
        .when('/produce/boardplan', {
            templateUrl: '/admin/produce/boardplan',
            controller: 'boardPlanCtrl'
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
                if (y.select) {
                    $scope.model.appIds.push(y.id);
                }
            })
        });
        $scope.model.adminIds = [];
        $scope.adminPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                if (y.select) {
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
                if (y.select) {
                    $scope.model.appIds.push(y.id);
                }
            })
        });
        $scope.model.adminIds = [];
        $scope.adminPage.forEach(function (x) {
            x.pages.forEach(function (y) {
                if (y.select) {
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
    $scope.getUser = function () {
        $http.post('/api/common/getUser').success(function (data) {
            $scope.user = data.data;
        });
    };
    $scope.meal = [
        {id: 0, name: '不用餐'},
        {id: 1, name: '用餐'}
    ];
    $scope.mealTime = [
        {id: 1, name: '午餐', select: false},
        {id: 2, name: '晚餐', select: true}
    ];
    $scope.bus = [
        {id: 0, name: '不乘车'},
        {id: 1, name: '乘车'}
    ];
    $scope.busTime = [
        {id: 1, name: '16:30'},
        {id: 2, name: '19:30'}
    ];
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
    $scope.showAddModal = function () {
        $scope.model = window.Util.copyObject($scope.pageModel);
        layui.laydate.render({
            elem: '#date-add',
            value: $scope.model.date = window.Util.dateToYYYYMMDD(new Date()),
            done: function (value, date, endDate) {
                $scope.model.date = value;
            }
        });
        $scope.index = layer.open({
            title: '添加加班记录',
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
            layer.msg('请完善加班信息');
            return;
        }
        if ($scope.model.meal == 1 && $scope.mealTime.filter(function (x) {
            return x.select == true;
        }).length == 0) {
            layer.msg('请完善加班信息');
            return;
        }
        if ($scope.model.bus_to && window.Util.isNull($scope.model.bus_to_station)) {
            layer.msg('请完善加班信息');
            return;
        }
        if ($scope.model.meal == 1) {
            if ($scope.mealTime.filter(function (x) {
                return x.select == true;
            }).length == 2) {
                $scope.model.meal_time = 3;
            } else {
                $scope.mealTime.forEach(function (x) {
                    if (x.select) {
                        $scope.model.meal_time = x.id;
                    }
                })
            }
        } else {
            $scope.model.meal_time = 0;
        }
        var data = window.Util.copyObject($scope.model);
        data.meal_time = $scope.model.meal == 1 ? $scope.model.meal_time : 0;
        data.bus_time = $scope.model.bus == 1 ? $scope.model.bus_time : 0;
        data.bus_to = $scope.model.bus_to ? 1 : 0;
        data.bus_to_station = $scope.model.bus_to ? $scope.model.bus_to_station : null;
        $http.post('/api/addJob', data).success(function (data) {
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
        userid: null,
        date: null,
        meal: 1,
        meal_time: null,
        bus: 1,
        bus_time: 2,
        bus_to: false,
        bus_to_station: null,
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.search.string1 = window.Util.dateToYYYYMMDD(new Date());
        $scope.model = window.Util.copyObject($scope.pageModel);
        $http.post('/api/getAddJobRecordAllDate').success(function (data) {
            var dateList = {};
            data.data.forEach(function (x) {
                dateList[x.date] = '';
            })
            layui.laydate.render({
                elem: '#date',
                value: $scope.search.string1 = window.Util.dateToYYYYMMDD(new Date()),
                mark: dateList,
                done: function (value, date, endDate) {
                    $scope.search.string1 = value;
                }
            });
        });
        $scope.getUser();
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
app.controller('patchPlanCtrl', function ($scope, $http) {
    $scope.line = ['D', 'X', 'P'];
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getPatchPlan', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
    };
    $scope.showAddModal = function () {
        $scope.model = window.Util.copyObject($scope.pageModel);
        layui.laydate.render({
            elem: '#date',
            type: 'datetime',
            value: $scope.model.time_start = window.Util.dateToYYYYMMDDHHMMSS(new Date()),
            done: function (value, date, endDate) {
                $scope.model.time_start = value;
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
    $scope.calculateEndTime = function () {
        if (window.Util.isNull($scope.model.count_plan) || $scope.model.count_plan == 0 ||
            window.Util.isNull($scope.model.extra_hour) ||
            window.Util.isNull($scope.model.speed) || $scope.model.speed == 0) {
            layer.msg('数据错误，无法计算');
            return;
        }
        var timestamp = window.Util.stringToDate($scope.model.time_start).getTime();
        timestamp += $scope.model.extra_hour * 3600 * 1000;
        timestamp += $scope.model.count_plan / $scope.model.speed * 3600 * 1000;
        $scope.model.time_end = window.Util.dateToYYYYMMDDHHMMSS(new Date(timestamp));
    };
    $scope.add = function () {
        $scope.calculateEndTime();
        if (window.Util.isNull($scope.model.model) ||
            window.Util.isNull($scope.model.order) ||
            window.Util.isNull($scope.model.batch) ||
            window.Util.isNull($scope.model.line) ||
            window.Util.isNull($scope.model.card) ||
            window.Util.isNull($scope.model.count_plan) || $scope.model.count_plan == 0 ||
            window.Util.isNull($scope.model.time_start) ||
            window.Util.isNull($scope.model.time_end) ||
            window.Util.isNull($scope.model.extra_hour) ||
            window.Util.isNull($scope.model.speed) || $scope.model.speed == 0) {
            layer.msg('请完善生产计划信息');
            return;
        }
        $http.post('/api/addPatchPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditModal = function (e) {
        e.time_start = window.Util.dateToYYYYMMDDHHMMSS(new Date(e.time_start));
        e.time_end = window.Util.dateToYYYYMMDDHHMMSS(new Date(e.time_end));
        $scope.model = e;
        layui.laydate.render({
            elem: '#date',
            type: 'datetime',
            value: e.time_start,
            done: function (value, date, endDate) {
                $scope.model.time_start = value;
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
        $scope.calculateEndTime();
        if (window.Util.isNull($scope.model.line) ||
            window.Util.isNull($scope.model.card) ||
            window.Util.isNull($scope.model.count_plan) || $scope.model.count_plan == 0 ||
            window.Util.isNull($scope.model.time_start) ||
            window.Util.isNull($scope.model.time_end) ||
            window.Util.isNull($scope.model.extra_hour) ||
            window.Util.isNull($scope.model.speed) || $scope.model.speed == 0) {
            layer.msg('请完善生产计划信息');
            return;
        }
        $http.post('/api/updatePatchPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditStepModal = function (e) {
        $scope.model = e;
        $scope.stepModel = {plan_id: e.id, step: null, message: null};
        $scope.index = layer.open({
            title: '生产计划进度更新',
            type: 1,
            content: $('#modal-step-edit'),
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
        $http.post('/api/updatePatchPlanStep', $scope.stepModel).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showFinishModal = function (e) {
        $scope.model = e;
        $scope.index = layer.open({
            title: '生产计划结转',
            type: 1,
            content: $('#modal-finish'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.finish = function () {
        if (window.Util.isNull($scope.model.count_finish) ||
            $scope.model.count_finish == 0 ||
            $scope.model.count_finish > $scope.model.count_plan) {
            layer.msg('请完善生产计划结转信息');
            return;
        }
        $http.post('/api/finishPatchPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showStepModal = function (e) {
        $http.post(`/api/getPatchPlanStep/${e.id}`).success(function (data) {
            $scope.planStep = data.data;
            $scope.index = layer.open({
                title: '生产计划进度',
                type: 1,
                content: $('#modal-step'),
                shade: 0,
                area: ['600px', '500px'],
                offset: '100px',
                maxHeight: 500,
                move: false,
                resize: false,
            });
        })
    };
    $scope.closeModal = function () {
        layer.close($scope.index);
    };
    $scope.delete = function (e) {
        layer.confirm('此操作将删除生产计划', null, function () {
            $http.post(`/api/deletePatchPlan/${e.id}`).success(function (data) {
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
    $scope.pageModel = {
        id: null,
        model: null,
        order: null,
        batch: null,
        line: null,
        card: null,
        count_plan: null,
        count_finish: null,
        time_start: null,
        time_end: null,
        extra_hour: null,
        speed: null,
        step: null,
        mark_plan: null,
        mark_finish: null,
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.model = window.Util.copyObject($scope.pageModel);
        $scope.get();
    };
    $scope.reset();
});
app.controller('boardPlanCtrl', function ($scope, $http) {
    $scope.team = [
        {id: 1, name: '1班', select: false},
        {id: 2, name: '2班', select: false},
        {id: 3, name: '3班', select: false},
    ];
    $scope.addTypeOption = [
        {id: 1, name: '贴片结转'},
        {id: 2, name: '无结转'},
    ];
    $scope.getPatchPlan = function () {
        $http.post('/api/getPatchPlanForBoardPlan').success(function (data) {
            $scope.patchPlan = data.data;
        });
    };
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getBoardPlan', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
    };
    $scope.showAddModal = function () {
        $scope.model = window.Util.copyObject($scope.pageModel);
        layui.laydate.render({
            elem: '#date',
            value: $scope.model.time_start = window.Util.dateToYYYYMMDD(new Date()),
            done: function (value, date, endDate) {
                $scope.model.time_start = value;
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
    $scope.$watch('model.plan_id', function () {
        if ($scope.model.type == 1 && !window.Util.isNull($scope.model.plan_id)) {
            $scope.patchPlan.forEach(function (x) {
                if (x.id == $scope.model.plan_id) {
                    $scope.model.model = x.model;
                    $scope.model.order = x.order;
                    $scope.model.batch = x.batch;
                    $scope.selectPatchPlan = x;
                }
            })
        }
    });
    $scope.add = function () {
        if ($scope.model.type == 1 && window.Util.isNull($scope.model.plan_id)) {
            layer.msg('请完善生产计划信息');
            return;
        }
        if ($scope.team.filter(function (x) {
            return x.select == true;
        }).length == 0) {
            layer.msg('请完善生产计划信息');
            return;
        }
        if (window.Util.isNull($scope.model.model) ||
            window.Util.isNull($scope.model.order) ||
            window.Util.isNull($scope.model.batch) ||
            window.Util.isNull($scope.model.count_plan) || $scope.model.count_plan == 0 ||
            window.Util.isNull($scope.model.time_start)) {
            layer.msg('请完善生产计划信息');
            return;
        }
        var team = '';
        if ($scope.model.type == 2) {
            $scope.model.plan_id = null;
        }
        $scope.team.forEach(function (x) {
            if (x.select) {
                team += x.id.toString();
            }
        })
        $scope.model.team = team;
        $http.post('/api/addBoardPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditModal = function (e) {
        $scope.model = e;
        $scope.model.type = e.plan_id == 0 ? 2 : 1;
        $scope.teamSelectList = e.team.toString().split('');
        $scope.team.forEach(function (x) {
            if ($scope.teamSelectList.filter(function (y) {
                return y == x.id.toString();
            }).length != 0) {
                x.select = true;
            } else {
                x.select = false;
            }
        })
        layui.laydate.render({
            elem: '#date',
            value: e.time_start,
            done: function (value, date, endDate) {
                $scope.model.time_start = value;
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
        if ($scope.team.filter(function (x) {
            return x.select == true;
        }).length == 0) {
            layer.msg('请完善生产计划信息');
            return;
        }
        if (window.Util.isNull($scope.model.count_plan) || $scope.model.count_plan == 0 ||
            window.Util.isNull($scope.model.time_start)) {
            layer.msg('请完善生产计划信息');
            return;
        }
        var team = '';
        if ($scope.model.type == 2) {
            $scope.model.plan_id = null;
        }
        $scope.team.forEach(function (x) {
            if (x.select) {
                team += x.id.toString();
            }
        })
        $scope.model.team = team;
        $http.post('/api/updateBoardPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditStepModal = function (e) {
        $scope.model = e;
        $scope.stepModel = {plan_id: e.id, step: null, message: null};
        $scope.index = layer.open({
            title: '生产计划进度更新',
            type: 1,
            content: $('#modal-step-edit'),
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
        } else if ($scope.model.step == 2) {
            $scope.stepModel.step = 3;
        } else {
            $scope.stepModel.step = null;
        }
        $http.post('/api/updateBoardPlanStep', $scope.stepModel).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showEditRecordModal = function (e) {
        $scope.model = e;
        $scope.recordModel = {plan_id: e.id, team: null, count_good: null, count_bad: null, date: null, message: null};
        layui.laydate.render({
            elem: '#date-record',
            value: $scope.recordModel.date = window.Util.dateToYYYYMMDD(new Date()),
            done: function (value, date, endDate) {
                $scope.recordModel.date = value;
            }
        });
        $scope.index = layer.open({
            title: '生产计划进度更新日结算',
            type: 1,
            content: $('#modal-record-edit'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.editRecord = function () {
        if (window.Util.isNull($scope.recordModel.team) ||
            window.Util.isNull($scope.recordModel.count_good) ||
            window.Util.isNull($scope.recordModel.count_bad) ||
            window.Util.isNull($scope.recordModel.date)) {
            layer.msg('请完善日结算信息');
            return;
        }
        $http.post('/api/updateBoardPlanRecord', $scope.recordModel).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showFinishModal = function (e) {
        e.count_finish = e.count_good + e.count_bad;
        $scope.model = e;
        $scope.index = layer.open({
            title: '生产计划结转',
            type: 1,
            content: $('#modal-finish'),
            shade: 0,
            area: '600px',
            maxHeight: 500,
            move: false,
            resize: false,
        });
    };
    $scope.finish = function () {
        $http.post('/api/finishBoardPlan', $scope.model).success(function (data) {
            layer.msg(data.message);
            if (data.success) {
                $scope.get();
                $scope.closeModal();
            }
        });
    };
    $scope.showStepModal = function (e) {
        $http.post(`/api/getBoardPlanStep/${e.id}`).success(function (data) {
            $scope.planStep = data.data;
            $scope.index = layer.open({
                title: '生产计划进度',
                type: 1,
                content: $('#modal-step'),
                shade: 0,
                area: ['600px', '500px'],
                offset: '100px',
                maxHeight: 500,
                move: false,
                resize: false,
            });
        })
    };
    $scope.showRecordModal = function (e) {
        $http.post(`/api/getBoardPlanRecord/${e.id}`).success(function (data) {
            $scope.planRecord = data.data;
            $scope.index = layer.open({
                title: '生产计划结算表',
                type: 1,
                content: $('#modal-record'),
                shade: 0,
                area: '600px',
                maxHeight: 500,
                move: false,
                resize: false,
            });
        })
    };
    $scope.closeModal = function () {
        layer.close($scope.index);
    };
    $scope.delete = function (e) {
        layer.confirm('此操作将删除生产计划', null, function () {
            $http.post(`/api/deleteBoardPlan/${e.id}`).success(function (data) {
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
    $scope.pageModel = {
        id: null,
        type: 1,
        plan_id: null,
        model: null,
        order: null,
        batch: null,
        team: null,
        count_plan: null,
        count_finish: null,
        time_start: null,
        time_end: null,
        step: null,
        mark_plan: null,
        mark_finish: null,
    };
    $scope.reset = function () {
        $scope.search = window.Util.getSearchObject();
        $scope.model = window.Util.copyObject($scope.pageModel);
        $scope.getPatchPlan();
        $scope.get();
    };
    $scope.reset();
});