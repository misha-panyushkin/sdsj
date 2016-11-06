import './Footer.less'
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

class Footer extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Footer'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <section
                className={ this._b }>

                <article
                    className={ this._b('Results') }
                    id="Results">
                    <div 
                        className={ this._b('ResultsTitle') }>
                        Подведение итогов
                    </div>
                    <div 
                        className={ this._b('ResultsDescription') }>
                        <p>
                            Проблема простого и понятного способа визуализации данных встаёт всегда, как только речь заходит о Big Data. В системе визуализации сделан упор на два визуально понятных каждому образа: <span className={ this._b('ResultsDescriptionColor') }>Цвет</span> и <span className={ this._b('ResultsDescriptionSize') }>Размер</span>. На этих образах была сформирована модель представления данных.
                        </p>
                        <p>
                            Основным достоинством созданной системы я считаю её "слоистость", благодаря которой визуализация огромного числа данных и последующий их анализ представляются в созданной системе простыми и быстрыми способами, даже с бОльшим количеством дополнительных данных.
                        </p>
                        <p>
                            В проекте так же использованы последние веяния разработки <i>веб</i> приложений.
                        </p>
                        <p>
                            По итогам проведённой работы можно говорить о достижении следующих результатов:
                        </p>
                        
                        <ol 
                            className={ this._b('ResultsDescriptionList') }>
                            <li className={ this._b('ResultsDescriptionListParagraph') }>
                                Решена задача кластеризации и упаковки большого числа данных
                            </li>
                            <li className={ this._b('ResultsDescriptionListParagraph') }>
                                Создана система хранения и покрытия слоями данных, с возможностью расширения числа слоёв
                            </li>
                            <li className={ this._b('ResultsDescriptionListParagraph') }>
                                Построена современная и гибкая система обмена данными
                            </li>
                            <li className={ this._b('ResultsDescriptionListParagraph') }>
                                Создан быстрый интерфейс визуализации данных для веба
                            </li>
                            <li className={ this._b('ResultsDescriptionListParagraph') }>
                                На основе имеющихся данных, выделено множество целевых клиентов для категории "авиа перевозки"
                            </li>
                        </ol>
                    </div>
                </article>

                <article
                    className={ this._b('Plans') }
                    id="NextVersion">
                    <div 
                        className={ this._b('PlansTitle') }>
                         Планы на будущее
                    </div>
                    <div 
                        className={ this._b('PlansDescription') }>
                        <p>
                            Для запуска системы в <i>продакшен</i>, необходимо завершение следующих этапов:
                        </p>
                        <ol 
                            className={ this._b('PlansDescription') }>
                            <li className={ this._b('PlansDescriptionParagraph') }>
                                Внедрить использование колоночных баз данных, например: Vertica DB
                            </li>
                            <li className={ this._b('PlansDescriptionParagraph') }>
                                Подключить мануальную систему настроек MCC кодов транзакций для выборки
                            </li>
                            <li className={ this._b('PlansDescriptionParagraph') }>
                                Провести эксперименты в корреляции имеющихся данных клиентов с всевозможными "слоями" дополнительных данных
                            </li>
                            <li className={ this._b('PlansDescriptionParagraph') }>
                                Установление динамики потока денежных средств на счету клиентов на основе экспериментов со "слоями"
                            </li>
                            <li className={ this._b('PlansDescriptionParagraph') }>
                                Создание рабочего интерфейса администратора на основе созданной системы
                            </li>
                        </ol>
                    </div>
                </article>

            </section>
        )
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
        ByMonthsActions: bindActionCreators(ByMonthsActions, dispatch),
    })
)(Footer)