var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/admin/user', {
            templateUrl: '/admin/admin/user',
            controller: 'userCtrl'
        })
        .when('/admin/admin', {
            templateUrl: '/admin/admin/admin',
            controller: 'adminCtrl'
        })
        .when('/admin/addjobrecord', {
            templateUrl: '/admin/admin/addjobrecord',
            controller: 'addJobRecordCtrl'
        })
        .when('/produce/plan', {
            templateUrl: '/admin/produce/plan',
            controller: 'planCtrl'
        })
        .when('/unauthorized', {
            templateUrl: '/error/unauthorized'
        })
        .otherwise({
            redirectTo: '/admin/addjobrecord'
        });
});
app.run(function ($rootScope, $http, $location) {
    $rootScope.getAdmin = function () {
        $http.post('/admin/getAdminAndPage').success(function (data) {
            $rootScope.admin = data.data.admin;
            window.Util.setCookie('admin', JSON.stringify(data.data.admin));
            $rootScope.menu = [];
            var pages = data.data.page;
            if ($rootScope.admin.userid == 12159 || $rootScope.admin.userid == 12155) {
                pages.push({
                    id: -1,
                    name: '员工管理',
                    sort: 1,
                    group_name: '员工管理',
                    group_sort: 0,
                    image: 'empty.jpg',
                    path_admin: '#/admin/user',
                    path_app: null,
                    systime: null
                });
                pages.push({
                    id: -2,
                    name: '账号管理',
                    sort: 2,
                    group_name: '员工管理',
                    group_sort: 0,
                    image: 'empty.jpg',
                    path_admin: '#/admin/admin',
                    path_app: null,
                    systime: null
                });
            }
            pages.sort(function (x, y) {
                return x.group_sort - y.group_sort;
            });
            var set = new Set();
            pages.forEach(function (x) {
                set.add(x.group_name);
            });
            var group = Array.from(set);
            group.forEach(function (x) {
                var menu = {name: x, select: false, pages: []};
                pages.forEach(function (y) {
                    if (y.group_name == x) {
                        menu.pages.push(y);
                    }
                })
                menu.pages.sort(function (x, y) {
                    return x.sort - y.sort;
                });
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
        for (var i = 0; i < $rootScope.menu.length; i++) {
            $rootScope.menu[i].select = false;
            for (var j = 0; j < $rootScope.menu[i].pages.length; j++) {
                $rootScope.menu[i].pages[j].select = false;
                if ($rootScope.menu[i].pages[j].path_admin == '#' + $location.path()) {
                    $rootScope.menu[i].pages[j].select = true;
                    $rootScope.menu[i].select = true;
                    return;
                }
            }
        }
        $location.path('/unauthorized');
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
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getUser', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            if (data.success) {
                $scope.data = data.data;
                $scope.makePage(data);
            }
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
        $scope.get();
    };
    $scope.reset();
});
app.controller('adminCtrl', function ($scope, $http) {
});
app.controller('addJobRecordCtrl', function ($scope, $http) {
    $scope.get = function () {
        $scope.search.loading = layer.load();
        $http.post('/api/getAddJobRecord', $scope.search).success(function (data) {
            layer.close($scope.search.loading);
            $scope.data = data.data;
            $scope.makePage(data);
        });
        $http.post('/api/getAddJobRecordOneDay/' + $scope.search.string1).success(function (data) {
            $scope.statistic = {
                userCount: 0,
                meal1Count: 0,
                meal2Count: 0,
                bus1Count: 0,
                bus2Count: 0,
            };
            data.data.forEach(function (x) {
                $scope.statistic.userCount++;
                if (x.meal_time == 1 || x.meal_time == 3) {
                    $scope.statistic.meal1Count++;
                }
                if (x.meal_time == 2 || x.meal_time == 3) {
                    $scope.statistic.meal2Count++;
                }
                if (x.bus_time == 1) {
                    $scope.statistic.bus1Count++;
                }
                if (x.bus_time == 2) {
                    $scope.statistic.bus2Count++;
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
        $scope.loading = null;
        $scope.search = window.Util.getSearchObject();
        $scope.search.string1 = window.Util.dateToYYYYMMDD(new Date());
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
        })
        $scope.get();
    };
    $scope.reset();
});
app.controller('planCtrl', function ($scope, $http) {
});