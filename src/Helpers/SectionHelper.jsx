
const components = {

}

export function filterBuilder(filterData, filterUtils){
  <div className='row line-divider-filter'>
    <div className="col-md-12 no-padding">
      <p className="text-muted no-margin-bottom display-inline-block">Revenue</p>
      {showFilter ?
        (<i className="fa fa-times add-icon-filter-remove animated fadeIn" onClick={()=> this.props.showFilter('Revenue')} />)
        : (<i className="fa fa-plus add-icon-filter animated fadeIn" onClick={()=> this.props.showFilter('Revenue')} />)
      }
    </div>
  </div>
  {showFilter ?
    (<div className="row animated fadeInLeft">
      <div className="col-md-6 no-padding">
        <p className="text-muted no-margin-bottom">min {formatNumber(100)}</p>
        <input
          type="number"
          className="form-control min-max-filter"
          name="name"
          onChange={(e)=> onChange(e, 'minMax')}
          value=''
        />
      </div>
      <div className="col-md-6 no-padding">
        <p className="text-muted no-margin-bottom">max {formatNumber(100)}</p>
        <input
          type="number"
          className="form-control min-max-filter"
          name="name"
          onChange={(e)=> onChange(e, 'minMax')}
          value=''
        />
      </div>
    </div>)
    : ''
  }
  return [];
}
