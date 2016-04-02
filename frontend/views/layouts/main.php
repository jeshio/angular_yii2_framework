<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" ng-app="app">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Angular Material Yii2 Framework">
    <?= Html::csrfMetaTags() ?>
    <title>Angular Yii каркас-приложение</title>
    <?php $this->head() ?>
    <script>paceOptions = {ajax: {trackMethods: ['GET', 'POST']}};</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/red/pace-theme-minimal.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body ng-cloak ng-controller="MainController" layout="column">
<?php $this->beginBody() ?>

    <md-toolbar>
      <md-tabs md-selected="selectedMenu" md-border-bottom >
        <md-tab ng-repeat="tab in menuTabs"
                md-on-select="tab.active = true; tab.click()"
                md-on-deselect="tab.active = false"
                ng-disabled="tab.hide()"
                >
                <md-icon ng-show="tab.icon"> {{tab.icon}} </md-icon>
                <a href="#{{tab.link}}" ng-class="{ 'active': tab.active }" ng-show="tab.link">{{tab.title}}</a>
        </md-tab>
      </mb-tabs>
    </md-toolbar>

    <div class="container" layout="row" flex>
        <md-sidenav md-component-id="leftNav" class="md-whiteframe-z2">
          <md-list>
            <md-list-item >
                <md-button>
                  First Level
                </md-button>
            </md-list-item>

            <md-list-item >
                <md-button>
                  Second Level
                </md-button>
            </md-list-item>

          </md-list>
        </md-sidenav>
        <md-content id="content" class="lightgreen" flex>
          <?= Breadcrumbs::widget([
              'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
          ]) ?>
          <?= Alert::widget() ?>
          <div ng-view>
          </div>
        </md-content>
    </div>

    <footer class="md-padding">
      <div flex>
          © 2016 Jeshio
      </div>
    </footer>

<!-- <div class="wrap">
    <nav class="navbar-inverse navbar-fixed-top navbar" role="navigation"  bs-navbar>
        <div class="container">
            <div class="navbar-header">
                <button ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" type="button" class="navbar-toggle">
                    <span class="sr-only">Переключить навигацию</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span></button>
                <a class="navbar-brand" href="#/">Jeshio</a>
            </div>
            <div ng-class="!navCollapsed && 'in'" ng-click="navCollapsed=true" class="collapse navbar-collapse" >
                <ul class="navbar-nav navbar-right nav">
                    <li data-match-route="/$">
                        <a href="#/">Главная</a>
                    </li>
                    <li data-match-route="/about">
                        <a href="#/about">О сайте</a>
                    </li>
                    <li data-match-route="/contact">
                        <a href="#/contact">Контакты</a>
                    </li>
                    <li data-match-route="/dashboard" ng-show="loggedIn()" class="ng-hide">
                        <a href="#/dashboard">Личный кабинет</a>
                    </li>
                    <li ng-class="{active:isActive('/logout')}" ng-show="loggedIn()" ng-click="logout()"  class="ng-hide">
                        <a href="">Выйти</a>
                    </li>
                    <li data-match-route="/login" ng-hide="loggedIn()">
                        <a href="#/login">Войти</a>
                    </li>

                    <li data-match-route="/signup" ng-hide="loggedIn()">
                        <a href="#/signup">Присоединиться</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
        <div ng-view>
        </div>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; Jeshio <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer> -->

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
