import './Intro.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import * as d3 from "d3"
import * as d3ScaleChromatic from 'd3-scale-chromatic'

import * as ByWeeksActions from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'
import * as ByMonthsActions from 'Actions/Demo/SeasonsSeries/ByMonths.actions'

import FA from 'react-fontawesome'

class Intro extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Intro'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <section
                className={ this._b }>
                    <article
                        className={ this._b('Header') }>
                        
                        <h1 className={ this._b('HeaderTitle') }>
                            Sberbank Data Science Journey
                        </h1>
                        <h2 className={ this._b('HeaderSubTitle') }>
                            Startup Challenge
                        </h2>
                    </article>

                    <div
                        className={ this._b('IntroLineStage').mix(['IntroLineStage']) }>
                    </div>

                    <article
                        className={ this._b('About') }>
                        <a 
                            className={ this._b('AboutPortrait') }
                            href="http://misha.panyushk.in/"
                            target="_blank">
                            <img 
                                src="/materials/portrait.jpg" 
                                />
                        </a>
                        <div 
                            className={ this._b('AboutDescription') }>
                            <p className={ this._b('AboutDescriptionParagraph').mix('FirstLetterParagraph') }>
                                Добро пожаловать на <i>демо</i> страницу, посвящённую решению задачи конкурса стартапов!
                            </p>
                            <p className={ this._b('AboutDescriptionParagraph') }>
                                Свой проект я назвал <span className={ this._b('AboutDescriptionProjectName') }>"Resourceful Dashboards"</span>, подразумевая под своим названием не только систему визуализации, но, в тоже время, достаточно осведомлённую, чтобы на основе результатов её работы можно было бы принимать взвешенные решения. 
                            </p>
                            <p className={ this._b('AboutDescriptionParagraph') }>
                                Проект аккумулировал в себе подходы из разных областей знания. В то же время, он находится в стадии <i>прототипа</i>. В общей сложности, работа над ним велась на протяжении всего месяца, отведённого на конкурс.
                            </p>
                            <p className={ this._b('AboutDescriptionParagraph') }>
                                Данная страница содержит несколько разделов, каждый из которых последовательно знакомит читателя с этапами разработки: 
                            </p>
                             <ol 
                                className={ this._b('AboutDescriptionList') }>
                                <li className={ this._b('AboutDescriptionListItem') }>
                                    <a href="#IdeaPart" className={ this._b('InternalLink') }>возникновение идеи</a>
                                </li>
                                <li className={ this._b('AboutDescriptionListItem') }>
                                    <a href="#ChallengePart" className={ this._b('InternalLink') }>формулирование задач на проект</a>
                                </li>
                                <li className={ this._b('AboutDescriptionListItem') }>
                                    <a href="#TechPart" className={ this._b('InternalLink') }>выбор технологии</a>
                                </li>
                                <li className={ this._b('AboutDescriptionListItem') }>
                                    <a href="#DashboardPart" className={ this._b('InternalLink') }>знакомство с созданной системой Resourceful Dashboards</a>
                                </li>
                                <li className={ this._b('AboutDescriptionListItem') }>
                                    <a href="#Results" className={ this._b('InternalLink') }>подведение итогов проделанной работы</a>
                                </li>
                            </ol>
                        </div>
                    </article>

                    <article
                        className={ this._b('Idea') }
                        id="IdeaPart">
                        <div 
                            className={ this._b('IdeaTitle') }>
                            ИДЕЯ
                        </div>
                        <div 
                            className={ this._b('IdeaDescription') }>
                            <p>
                                Почти каждый раз, когда представляется возможность подумать над решением интересной задачи, имеющей непосредственное отражение в реальном мире, включаешься с удвоенными силой и воображением.
                            </p>
                            <p>
                                Начав размышлять о целях, которые могут ставить перед собой современные банки и, в частности, Сбербанк, я решил начать с просмотра линейки продуктов, которые Сбербанк предлагает своим клиентам.
                                Просмотрев информацию о всевозможных кредитных и дебетовых карточках, накопительных и сберегательных счетах, программах лояльности и бонусные предложения, я определился с тарифом и решил продолжить исследование в сравнении.
                                Более всего остального, меня заинтересовали предложения о возможностях возврата части потраченных средств обратно на карточку - широко популярная в узких кругах система Cashback. Продолжив исследование, я обратился к аналогичным продуктам других банков.
                                По результатам исследования, я сделал вывод о том, что продукт, который меня заинтересовал, возможно получить только у достаточно ограниченного числа банков. Тем не менее, программы каждого из них разнятся. 
                            </p>
                            <p>
                                Оставаясь верным своим представлениям о первостепенности и важности клиента для любого предприятия предоставляющего услуги, коим являются банки, я смог сформулировать требования, которые оформил в задачи и к решению которых приступил незамедлительно.
                            </p>
                        </div>
                    </article>

                    <article
                        className={ this._b('Challenge') }
                        id="ChallengePart">
                        <div 
                            className={ this._b('ChallengeTitle') }>
                            ЗАДАЧИ
                        </div>
                        <div 
                            className={ this._b('ChallengeDescription') }>
                            После проведения исследования, перед проектом были поставлены два типа задач: технические и бизнес. С технической точки зрения, необходимо было решить задачу компактного представления 7 миллионов транзакций без перегрузки пользователя излишней информацией. Вторая по важности задача заключалась в создании быстрой системы, способной оперировать большими объёмами данных без ущерба в производительности. Основной бизнес-задачей является определение целевого множества лояльных клиентов, по отношению к заданным поставщикам услуг или товаров. 
                        </div>
                        <div 
                            className={ this._b('ChallengeLists') }>
                            <div 
                                className={ this._b('ChallengeList').mix('Technological') }>
                                <div 
                                    className={ this._b('ChallengeListTitle') }>
                                    технические
                                </div>
                                <ol 
                                    className={ this._b('ChallengeDescriptionTechnological') }>
                                    <li className={ this._b('ChallengeDescriptionParagraph') }>
                                        Построить простую и понятную модель представления данных для "не обладающего специфическими знаниями" пользователя
                                    </li>
                                    <li className={ this._b('ChallengeDescriptionParagraph') }>
                                        Решить задачу кластеризации и упаковки большого числа данных
                                    </li>
                                    <li className={ this._b('ChallengeDescriptionParagraph') }>
                                        Решить задачу построения гибкой и быстро-работающей архитектуры по обмену данными
                                    </li>
                                    <li className={ this._b('ChallengeDescriptionParagraph') }>
                                        Решить задачу создания быстрого интерфейса визуализации данных
                                    </li>
                                </ol>
                            </div>
                            <div 
                                className={ this._b('ChallengeList').mix('Business') }>
                                <div 
                                    className={ this._b('ChallengeListTitle') }>
                                    бизнес
                                </div>
                                <ol 
                                    className={ this._b('ChallengeDescriptionBusiness') }>
                                    <li className={ this._b('ChallengeDescriptionParagraph') }>
                                        Выделить множество лояльных клиентов по отношению к задаваемым поставщикам услуг или товаров
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </article>

                    <article
                        className={ this._b('Technology') }
                        id="TechPart">
                        <div 
                            className={ this._b('TechnologyTitle') }>
                            ТЕХНОЛОГИИ
                        </div>
                        <div 
                            className={ this._b('TechnologyDescription') }>
                            <p>
                                Основным критерием в создании <span className={ this._b('AboutDescriptionProjectName') }>"Resourceful Dashboards"</span> является доступность этой системы для всех групп пользователей. Было решено создать <i>веб</i> сервер с поддержкой разных протоколов обмена данными для разных "клиентов-приложений".
                            </p>
                            <p>
                                Логика распределения запросов написана на языке NodeJS, для кластеризации данных написан специальный демон - программа обрабатывающая таймлайны в параллельных потоках. В качестве платформы для микросервисов была выбрано решение от Docker. Приложение запущено на выделенном сервере в одном из облаков.
                            </p>
                            <p>
                                На данный момент, единственным "клиентом-приложением" для сервиса является <i>веб</i> интерфейс. Технологический стек на вебе: React + Redux, Data Driven Documents (D3), Webpack, и прочее.
                            </p>
                            <p>
                                Для прототипа основным требованием было постоянное выполнение бекапов со стороны демона кластеризации для быстрого доступа к кластеризованным данным со стороны "клиентов-приложений".
                            </p>
                            <p>
                                Что касается планов на дальнейшее развитие системы с технической точки зрения, смотрите раздел в конце презентации: <a href="#NextVersion" className={ this._b('InternalLink') }>Планы на будущее</a>.
                            </p>
                        </div>
                    </article>

                    <div
                        className={ this._b('IntroLineStage').mix(['IntroLineStage', 'Middle']) }>
                    </div>

                    <article
                        className={ this._b('Visualisation') }
                        id="DashboardPart">
                        <div 
                            className={ this._b('VisualisationDescription') }>
                            <div 
                                className={ this._b('VisualisationDescriptionData') }>
                                <div 
                                    className={ this._b('VisualisationDescriptionDataTransactions') }>
                                    <div 
                                        className={ this._b('VisualisationDescriptionDataTransactionsNumber') }>
                                        7M
                                    </div>
                                    <div 
                                        className={ this._b('VisualisationDescriptionDataTransactionsLabel') }>
                                        таймлайнов
                                    </div>
                                </div>
                                <div 
                                    className={ this._b('VisualisationDescriptionDataPeriod') }>
                                    <div 
                                        className={ this._b('VisualisationDescriptionDataPeriodNumber') }>
                                        2014 - 2015
                                    </div>
                                    <div 
                                        className={ this._b('VisualisationDescriptionDataPeriodLabel') }>
                                        чуть более года
                                    </div>
                                </div>
                                <div 
                                    className={ this._b('VisualisationDescriptionDataMCC') }>
                                    <div 
                                        className={ this._b('VisualisationDescriptionDataMCCNumber') }>
                                        MCC
                                    </div>
                                    <div 
                                        className={ this._b('VisualisationDescriptionDataMCCLabel') }>
                                        коды транзакций
                                    </div>
                                </div>
                            </div>  
                            <div 
                                className={ this._b('VisualisationDescriptionTitle') }>  
                                Для основного представления данных были выбраны тепловые матрицы, в двух группировках:
                            </div>
                            <div 
                                className={ this._b('VisualisationDescriptionGrouping') }> 
                                <div 
                                    className={ this._b('VisualisationDescriptionGroupingByWeeks') }> 
                                    <div 
                                        className={ this._b('VisualisationDescriptionGroupingByWeeksTitle') }> 
                                        по дням недели и часам
                                    </div>
                                    <div 
                                        className={ this._b('VisualisationDescriptionGroupingByWeeksElements') }> 
                                        
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeIncome').mix(['ModeItem']).toString() }
                                                name="plus"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим отображения доходов
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeExpense').mix(['ModeItem']).toString() }
                                                name="minus"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим отображения расходов
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeGridSize').mix(['ModeItem']).toString() }
                                                name="circle"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                размер относительного размера точки
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeScaleLog').mix(['ModeItem']).toString() }
                                                name="gbp"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим логарифмической шкалы
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div 
                                    className={ this._b('VisualisationDescriptionGroupingByMonths') }> 
                                    <div 
                                        className={ this._b('VisualisationDescriptionGroupingByMonthsTitle') }> 
                                        по месяцам и дням
                                    </div>
                                    <div 
                                        className={ this._b('VisualisationDescriptionGroupingByMonthsElements') }> 

                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeIncome').mix(['ModeItem']).toString() }
                                                name="plus"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим отображения доходов
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeExpense').mix(['ModeItem']).toString() }
                                                name="minus"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим отображения расходов
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeWeather').mix(['ModeItem']).toString() }
                                                name="cloud"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим корреляции с метеорологической информацией
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeGridSize').mix(['ModeItem']).toString() }
                                                name="circle"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                размер относительного размера точки
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeHolidays').mix(['ModeItem']).toString() }
                                                name="star"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим корреляции с общегосударственными праздниками
                                            </div>
                                        </div>
                                        <div 
                                            className={ this._b('Mode') }
                                            >
                                            <FA 
                                                className={ this._b('ModeScaleLog').mix(['ModeItem']).toString() }
                                                name="gbp"
                                                />
                                            <div className={ this._b('ModeDescription') }>
                                                режим логарифмической шкалы
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className={ this._b('VisualisationDescriptionSandbox') }>  
                                Одни из основных комбинаций <a href="#SeasonsSeries" className={ this._b('InternalLink') }><i>песочницы</i></a> по группировкам:
                                <div 
                                    className={ this._b('VisualisationDescriptionSandboxSubTitle') }>  
                                    это <i>демо</i> секция, которая поможет изучить интерфейс
                                </div>
                            </div>

                            <div 
                                className={ this._b('VisualisationDescriptionSandboxGrouping') }> 
                                <div 
                                    className={ this._b('VisualisationDescriptionSandboxGroupingByWeeks') }> 
                                    <div 
                                        className={ this._b('VisualisationDescriptionSandboxGroupingCombos') }> 

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div 
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoMaxByWeeks() }
                                                > 
                                                MAX VALUES
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                выделение максимальных значений в сериях
                                            </div>
                                        </div>

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoMinByWeeks() }
                                                > 
                                                MIN VALUES
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                выделение минимальных значений в сериях
                                            </div>
                                        </div>

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoLogByWeeks() }
                                                > 
                                                LOG SCALE
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                включение логарифмической шкалы в сравнении с относительными значениями по часам
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div 
                                    className={ this._b('VisualisationDescriptionSandboxGroupingByMonths') }> 
                                    <div 
                                        className={ this._b('VisualisationDescriptionSandboxGroupingCombos') }> 
                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div 
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoMaxByMonths() }
                                                > 
                                                MAX VALUES
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                выделение максимальных значений в сериях
                                            </div>
                                        </div>

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoMinByMonths() }
                                                > 
                                                MIN VALUES
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                выделение минимальных значений в сериях
                                            </div>
                                        </div>

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoLogByMonths() }
                                                > 
                                                LOG SCALE
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                включение логарифмической шкалы в сравнении с относительными значениями по часам
                                            </div>
                                        </div>

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoSimpleSelectByMonths() }
                                                > 
                                                SIMPLE SELECT
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                просмотр значений в точке и суммарных по месяцам
                                            </div>
                                        </div>

                                        <div 
                                            className={ this._b('SandboxCombo') }> 
                                            <div
                                                className={ this._b('SandboxComboName') }
                                                onClick={ () => this.handleDemoWeatherComboByMonths() }
                                                > 
                                                WEATHER COMBO
                                            </div>
                                            <div className={ this._b('SandboxComboDescription') }> 
                                                установление корреляции расходов в зависимости от погоды в Москве и общегосударственных праздников
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            className={ this._b('VisualisationHeatMatricesInfo') }>  
                            Тепловые матрицы скоррелированы между собой таким образом, что выбирая точку из <a href="#ByMonthsVisualisation" className={ this._b('InternalLink') }>второй матрицы</a> (сгруппированной по месяцам), мы видим распределение величин относительно <a href="#ByWeeksVisualisation" className={ this._b('InternalLink') }>первой матрицы</a> (группировка по неделям), аналогичным образом мы можем выбрать целиком весь месяц и увидеть распределение величин в этом месяце относительно первой тепловой карты.
                        </div>
                    </article>
                    <div
                        className={ this._b('IntroLineStage').mix(['IntroLineStage', 'Middle']) }>
                    </div>
            </section>
        )
    }

    componentDidMount () {
        setTimeout(() => {
            lineDrawer()
        }, 1500)
    }

    handleDemoMaxByWeeks () {
        const ByWeeksVisualisation = document.getElementById('ByWeeksVisualisation')
        const {
            ByWeeksActions,
        } = this.props

        ByWeeksActions.switchModeGridSize(false)
        ByWeeksActions.switchModeScaleLog(false)
        ByWeeksActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByWeeksActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByWeeksVisualisation.offsetTop - 50)

        setTimeout(() => {
            ByWeeksActions.setSort({
                axis: 'x', 
                order: 'desc',
            })
        }, 700)

        setTimeout(() => {
            ByWeeksActions.setSort({
                axis: 'y', 
                order: 'asc',
            })
        }, 1800)

        setTimeout(() => {
            ByWeeksActions.switchModeGridSize(true)
        }, 2800)
    }
    
    handleDemoMinByWeeks () {
        const ByWeeksVisualisation = document.getElementById('ByWeeksVisualisation')
        const {
            ByWeeksActions,
        } = this.props

        ByWeeksActions.switchModeGridSize(false)
        ByWeeksActions.switchModeScaleLog(false)
        ByWeeksActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByWeeksActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByWeeksVisualisation.offsetTop - 50)

        setTimeout(() => {
            ByWeeksActions.setSort({
                axis: 'x', 
                order: 'asc',
            })
        }, 700)

        setTimeout(() => {
            ByWeeksActions.setSort({
                axis: 'y', 
                order: 'desc',
            })
        }, 1800)

        setTimeout(() => {
            ByWeeksActions.switchModeGridSize(true)
        }, 2800)
    }

    handleDemoLogByWeeks () {
        const ByWeeksVisualisation = document.getElementById('ByWeeksVisualisation')
        const {
            ByWeeksActions,
        } = this.props

        ByWeeksActions.switchModeGridSize(false)
        ByWeeksActions.switchModeScaleLog(false)
        ByWeeksActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByWeeksActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByWeeksVisualisation.offsetTop - 50)

        setTimeout(() => {
            ByWeeksActions.switchModeGridSize(true)
        }, 1500)

        setTimeout(() => {
            ByWeeksActions.switchModeScaleLog(true)
        }, 3000)
    }




    handleDemoMaxByMonths () {
        const ByMonthsVisualisation = document.getElementById('ByMonthsVisualisation')
        const {
            ByMonthsActions,
        } = this.props

        ByMonthsActions.switchModeGridSize(false)
        ByMonthsActions.switchModeScaleLog(false)
        ByMonthsActions.switchModeWeather(false)
        ByMonthsActions.switchModeHolidays(false)
        ByMonthsActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByMonthsActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByMonthsVisualisation.offsetTop - 50)

        setTimeout(() => {
            ByMonthsActions.setSort({
                axis: 'x', 
                order: 'desc',
            })
        }, 700)

        setTimeout(() => {
            ByMonthsActions.setSort({
                axis: 'y', 
                order: 'asc',
            })
        }, 1800)

        setTimeout(() => {
            ByMonthsActions.switchModeGridSize(true)
        }, 2800)
    }
    
    handleDemoMinByMonths () {
        const ByMonthsVisualisation = document.getElementById('ByMonthsVisualisation')
        const {
            ByMonthsActions,
        } = this.props

        ByMonthsActions.switchModeGridSize(false)
        ByMonthsActions.switchModeScaleLog(false)
        ByMonthsActions.switchModeWeather(false)
        ByMonthsActions.switchModeHolidays(false)
        ByMonthsActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByMonthsActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByMonthsVisualisation.offsetTop - 50)

        setTimeout(() => {
            ByMonthsActions.setSort({
                axis: 'x', 
                order: 'asc',
            })
        }, 700)

        setTimeout(() => {
            ByMonthsActions.setSort({
                axis: 'y', 
                order: 'desc',
            })
        }, 1800)

        setTimeout(() => {
            ByMonthsActions.switchModeGridSize(true)
        }, 2800)
    }

    handleDemoLogByMonths () {
        const ByMonthsVisualisation = document.getElementById('ByMonthsVisualisation')
        const {
            ByMonthsActions,
        } = this.props

        ByMonthsActions.switchModeGridSize(false)
        ByMonthsActions.switchModeScaleLog(false)
        ByMonthsActions.switchModeWeather(false)
        ByMonthsActions.switchModeHolidays(false)
        ByMonthsActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByMonthsActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByMonthsVisualisation.offsetTop - 50)

        setTimeout(() => {
            ByMonthsActions.switchModeGridSize(true)
        }, 1500)

        setTimeout(() => {
            ByMonthsActions.switchModeScaleLog(true)
        }, 3000)
    }

    handleDemoSimpleSelectByMonths () {
        const ByMonthsVisualisation = document.getElementById('ByMonthsVisualisation')
        const {
            ByMonthsActions,
        } = this.props

        ByMonthsActions.switchModeGridSize(false)
        ByMonthsActions.switchModeScaleLog(false)
        ByMonthsActions.switchModeWeather(false)
        ByMonthsActions.switchModeHolidays(false)
        ByMonthsActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByMonthsActions.setSort({
            axis: 'y', 
            order: null,
        })

        window.scrollTo(0, ByMonthsVisualisation.offsetTop - 50)

        for (var i = 0; i < 4; i++) {
            setTimeout(() => {
                ByMonthsActions.setHoverCoordinates({
                    x: Math.floor(Math.random()*1e1),
                })
            }, 1000 * i)
        }

        setTimeout(() => {
            for (var i = 0; i < 4; i++) {
                setTimeout(() => {
                    ByMonthsActions.setHoverCoordinates({
                        y: Math.floor(Math.random()*1e1),
                    })
                }, 1000 * i)
            }
        }, 4000)

        setTimeout(() => {
            for (var i = 0; i < 5; i++) {
                setTimeout(() => {
                    ByMonthsActions.setHoverCoordinates({
                        x: i + Math.floor(Math.random()*1e1),
                        y: 12 - Math.floor(Math.random()*1e1),
                    })
                }, 1000 * i)
            }
        }, 8000)
    }

    handleDemoWeatherComboByMonths () {
        const ByMonthsVisualisation = document.getElementById('ByMonthsVisualisation')
        const {
            ByMonthsActions,
        } = this.props

        ByMonthsActions.switchModeGridSize(false)
        ByMonthsActions.switchModeScaleLog(false)
        ByMonthsActions.switchModeWeather(false)
        ByMonthsActions.switchModeHolidays(false)
        ByMonthsActions.setSort({
            axis: 'x', 
            order: null,
        })
        ByMonthsActions.setSort({
            axis: 'y', 
            order: null,
        })

        setTimeout(() => {
            ByMonthsActions.switchModeWeather(true)
        }, 1500)

        setTimeout(() => {
            ByMonthsActions.switchModeHolidays(true)
        }, 2500)

        setTimeout(() => {
            ByMonthsActions.switchModeDataType('expenses')
        }, 3500)

        setTimeout(() => {
            ByMonthsActions.switchModeGridSize(true)
        }, 4500)

        window.scrollTo(0, ByMonthsVisualisation.offsetTop - 50)
    }

}

export default connect(
    state => ({
    }),
    dispatch => ({
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
        ByMonthsActions: bindActionCreators(ByMonthsActions, dispatch),
    })
)(Intro)



function lineDrawer () {
    const w = window.innerWidth
    const h = 190
    const l = 20
    const maxHeight = 1e1

    const iterableList = "fklgsadfkjgasfgaskjfgskagfklgsadfkjgasfgaskjfgskag".split('')
    const colors = d3.scaleOrdinal( d3ScaleChromatic.schemeGreys[9] ).domain([0, iterableList.length])
    const durations = d3.scaleLinear().range([5000, 32000]).domain(colors.domain())
    
    const svg = d3.selectAll(".IntroLineStage")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", "visualization")

    const x = d3.scaleLinear().domain([0, 10]).range([0, w])
    const y = d3.scaleLinear().domain([0, maxHeight]).range([10, h - 10])
    
    const line = d3.line()
        .curve(d3.curveBasis)
        .x((d,i) => x(i))
        .y(d => y(d))

    iterableList.forEach((d, index) => {
        const path = svg.append("path")
            .attr("d", d => {
                const data = d3.range(l).map((v, i) => Math.random() * maxHeight)
                return line(data)
            })
            .attr("stroke", () => {
                const color = d3.color(
                    index % 10
                        ? index % 5
                            ? colors(index)
                            : d3ScaleChromatic.interpolateBlues(Math.random())
                        : d3ScaleChromatic.interpolateReds(Math.random())
                )
                color.opacity = Math.random() / 5
                return color.toString()
            } )
            .attr("stroke-width", Math.random() * 1e1 / 5)
            .attr("fill", "none")

        const totalLength = path.node().getTotalLength()

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
                .duration(durations(index))
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
    })
}