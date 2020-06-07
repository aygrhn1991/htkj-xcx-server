var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/user', {
            templateUrl: '/admin/user',
            controller: 'userCtrl'
        })
        .when('/addjobrecord', {
            templateUrl: '/admin/addjobrecord',
            controller: 'addJobRecordCtrl'
        })
        .otherwise({
            redirectTo: '/user'
        });
});
app.run(function ($rootScope, $location, $timeout) {
    $rootScope.menu = [{
        id: 1,
        name: '员工管理',
        select: false,
        pages: [{id: 1, name: '员工信息审核', select: false, path: '#/user'}]
    }, {
        id: 2,
        name: '加班申报',
        select: false,
        pages: [{id: 3, name: '加班申报', select: false, path: '#/addjobrecord'}]
    }];
    layui.use('element', function () {
        var element = layui.element;
    });
    $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
        if ($rootScope.menu != null) {
            $rootScope.matchMenu();
        }
    });
    $rootScope.matchMenu = function () {
        $rootScope.menu.forEach(function (e) {
            e.select = false;
            e.pages.forEach(function (f) {
                f.select = false;
                if (f.path == '#' + $location.path()) {
                    f.select = true;
                    e.select = true;
                }
            });
        });
    };
    $rootScope.matchMenu();
    $rootScope.menuClick = function (e) {
        $rootScope.menu.forEach(function (f) {
            f.select = false;
        });
        e.select = true;
    };
});
app.controller('userCtrl', function ($scope, $http) {
    $scope.get = function () {
        $scope.loading = layer.load();
        $http.post('/admin/getUserList', $scope.search).success(function (data) {
            layer.close($scope.loading);
            if (data.success) {
                $scope.data = data.data;
                $scope.makePage(data);
            }
        });
    };
    $scope.delete = function (e) {
        layer.confirm('此操作将拒绝用户认证', null, function () {
            $http.post('/admin/deleteUser/' + e.id).success(function (data) {
                layer.msg(data.message);
                if (data.success) {
                    $scope.get();
                }
            });
        });
    };
    $scope.editState = function (e, state) {
        layer.confirm('此操作将更改用户账号状态', null, function () {
            $http.post('/admin/updateUserState/' + e.id + '/' + state).success(function (data) {
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
    $scope.m = {
        id: null,
        openid: null,
        name: null,
        department_id: null,
        state: null,
        systime: null
    };
    $scope.reset = function () {
        $scope.loading = null;
        $scope.search = window.Util.getSearchObject();
        $scope.model = window.Util.copyObject($scope.m);
        $scope.get();
    };
    $scope.reset();
});
app.controller('addJobRecordCtrl', function ($scope, $http) {
    $scope.get = function () {
        $scope.loading = layer.load();
        $http.post('/admin/getAddJobRecordList', $scope.search).success(function (data) {
            layer.close($scope.loading);
            if (data.success) {
                $scope.data = data.data;
                $scope.makePage(data);
            }
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
    $scope.m = {
        id: null,
        userid: null,
        time: null,
        meal: null,
        bus: null,
        del: null,
        systime: null
    };
    $scope.reset = function () {
        $scope.loading = null;
        $scope.search = window.Util.getSearchObject();
        $scope.model = window.Util.copyObject($scope.m);
        layui.laydate.render({
            elem: '#date',
            value: $scope.search.string1 = window.Util.dateToYYYYMMDD(new Date()),
            done: function (value, date, endDate) {
                console.log(value);
                $scope.search.string1 = value;
            }
        });
        $scope.get();
    };
    $scope.reset();
});