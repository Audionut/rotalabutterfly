import SelectFertType from '../view/SelectFertType';
import RadioSolutionDry from '../view/RadioSolutionDry';

var source = React.createClass({
	loadOptionsFromServer: function() {
		console.log(this.state.fertType);
		var url = '';
		if (this.state.fertType === 'diy') {
			url = 'http://rotala.dev/json/compounds.json';
		} else if (this.state.fertType === 'premixed') {
			url = 'http://rotala.dev/json/commercial-products.json';
		}
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({options: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	  },
	getInitialState: function() {
	    return {
	      fertType : null,
	      options: []
	    }
	  },
	isChecked: function(event) {
		this.setState({fertType: event.target.value}, function(){
			this.loadOptionsFromServer();
		});
	},
	render: function() {
		if (this.state.fertType === null) {
	      	return ( 
        		<div className="form-group">
			      	<label className="col-sm-4 control-label" htmlFor="source">{this.props.labels.type_of}</label>
			      	<div className="col-sm-8">
				        <label className="radio-inline">
				          <input type="radio" name="source" id="source" value="diy" onChange={this.isChecked} /> {this.props.labels.diy}
				        </label>
				        <label className="radio-inline">
				          <input type="radio" name="source" id="source" value="premixed" onChange={this.isChecked} /> {this.props.labels.commercial}
				        </label>
			        </div>
			    </div>
			);
	    } else if (this.state.fertType === 'diy') {
	      	return (
	      		<div>
		        	<div className="form-group">
				      	<label className="col-sm-4 control-label" htmlFor="source">{this.props.labels.type_of}</label>
				      	<div className="col-sm-8">
					        <label className="radio-inline">
					          <input type="radio" name="source" id="source" value="diy" checked="checked" onChange={this.isChecked} /> {this.props.labels.diy}
					        </label>
					        <label className="radio-inline">
					          <input type="radio" name="source" id="source" value="premixed" onChange={this.isChecked} /> {this.props.labels.commercial}
					        </label>
				        </div>
				    </div>
				    <SelectFertType options={this.state.options} fertType={this.state.fertType} labels={this.props.labels} units={this.props.units} />
				    <RadioSolutionDry labels={this.props.labels} units={this.props.units} />
				</div>
	        );
	    } else if (this.state.fertType === 'premixed') {
	        return (
	        	<div>
		        	<div className="form-group">
				      	<label className="col-sm-4 control-label" htmlFor="source">{this.props.labels.type_of}</label>
				      	<div className="col-sm-8">
					        <label className="radio-inline">
					          <input type="radio" name="source" id="source" value="diy" onChange={this.isChecked} /> {this.props.labels.diy}
					        </label>
					        <label className="radio-inline">
					          <input type="radio" name="source" id="source" value="premixed" checked="checked" onChange={this.isChecked} /> {this.props.labels.commercial}
					        </label>
				        </div>
				    </div>
				    <SelectFertType options={this.state.options} fertType={this.state.fertType} labels={this.props.labels} units={this.props.units} />
				</div>
			);
	    } else {
	    	return (
	    			<div className="alert alert-danger">Something Done Broke!</div>
	    		);
	    }
	}
});

module.exports = source;