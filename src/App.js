import React, {Component} from 'react';
import ContentItem from './components/content';
import {connect} from 'react-redux';
import * as actions from './actions';
import './App.css';
import loader from './images/ajax-loader.gif'

class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        dropDown : ''
      }
    }
    componentDidMount() {
        this.props.fetchNews();
    }
    renderPosts() {
        const {filterPosts} = this.props;
        return filterPosts.map((post) => {
            if (!post.has('api_rate_limit')) {
                return (<ContentItem {...post.toJS()} key={post.get('id')}/>)
            }
        });
    }

    handleChange(event) {
        this.props.updateText(event.target.value);
    }

    handleDropDown(event){
      this.setState({dropDown:event.target.value});
      this.props.sortPosts(event.target.value);
    }

    render() {
        const {isFetching, searchText} = this.props;
        return (
            <div id="layout">
                <div className="header">
                    <h1>Hacker News</h1>
                </div>
                <div className="sort">
                  <select value={this.state.dropDown} onChange={this.handleDropDown.bind(this)}>
                    <option value="ascend_date">Ascending Order By Date</option>
                    <option value="ascend_points">Ascending Order By Points</option>
                    <option value="descend_date">Descending Order By Date</option>
                    <option value="descend_points">Descinding Order By Points</option>
                  </select>
                </div>
                <div className="search-form">
                    <input type="text" value={searchText} placeholder="Type to start searching.." onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="content">
                    {isFetching
                        ? <img className="loading" src={loader}/>
                        : this.renderPosts()}
                </div>
            </div>
        );
    }
}

const filterPosts = (posts, searchText) => {
    if (searchText) {
        return posts.filter((post) => {
            const searchFor = searchText.toLowerCase();
            const postTitle = post.get('title', '').toLowerCase();
            return postTitle.indexOf(searchFor) > -1;
        });
    } else {
        return posts;
    }
}

const mapStateToProps = (state) => ({
    posts: state.get('posts'),
    isFetching: state.get('isFetching'),
    searchText: state.get('searchText'),
    filterPosts : filterPosts(state.get('posts'),state.get('searchText'))
});

export default connect(mapStateToProps, actions)(App);
