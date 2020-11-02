import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  };

  renderForm = () => {
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit} />
      </div>
    )
  }
  
  render(){
    if(this.props.currentUserId && this.props.stream){
      if(this.props.currentUserId !== this.props.stream.userId){
        return <div>YOU DO NOT HAVE ACCESS TO EDIT THIS STREAM</div>;
      }
      else{
        return this.renderForm();
      };
    };
    return <div>Loading...</div>;
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);