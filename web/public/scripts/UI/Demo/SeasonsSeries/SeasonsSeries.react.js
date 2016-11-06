import './SeasonsSeries.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import I from 'immutable'

import * as SeasonsSeriesActions from 'Actions/Demo/SeasonsSeries.actions'

import {
    SeasonsSeries as VisualSeasonsSeries,
} from 'UI/VisualComponents'
import ByWeeks from './ByWeeks.react'
import ByMonths from './ByMonths.react'

class SeasonsSeries extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'SeasonsSeries'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <section
                className={ this._b }
                id="SeasonsSeries">
                
                <h2 className={ this._b('SeriesTitle') }>
                    RESOURCEFUL DASHBOARDS
                </h2>
                <ByWeeks className={ this._b('ByWeeks') } />
                <ByMonths className={ this._b('ByMonths') } />

            </section>
        )
    }

    componentDidMount () {
        const {
            SeasonsSeriesActions
        } = this.props

        // setTimeout(() => {
            SeasonsSeriesActions.getSeasonsSeries({})
        // }, 6000)
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        SeasonsSeriesActions: bindActionCreators(SeasonsSeriesActions, dispatch),
    })
)(SeasonsSeries)