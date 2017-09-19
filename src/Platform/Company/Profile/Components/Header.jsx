import React, { Component } from 'react';
import urlParser from 'url-parse'
import isEmpty from 'is-empty'

class CompanyHeader extends Component {
  render() {
    const profileData = this.props.profileData.basicDetails;
    // const flipInAnimation = 'rating-box show animated slideInRight';
    // const flipOutAnimation = 'rating-box hide animated flipOutX';
    let urlParsed;
    if(!isEmpty(profileData.url)){
      urlParsed = urlParser(profileData.url)
      if(urlParsed.hostname === 'localhost' || urlParsed.hostname === 'platform.debtmaven.com'){
        urlParsed.set('protocol', 'http')
        urlParsed.set('hostname', profileData.url)
        urlParsed.set('host', profileData.url)
        urlParsed.set('pathname', '')
      }
    }
    // const ratingBox = (
    //   <div className={ this.state.openRatingSection ? flipInAnimation : flipOutAnimation }>
    //     <div className="row">
    //       <div className="col-md-3 text-right">
    //         <p className="profile-text text-muted no-margin-bottom" >Communication: </p>
    //         <p className="profile-text text-muted no-margin-bottom" >Execution: </p>
    //         <p className="profile-text text-muted no-margin-bottom" >Flexibility: </p>
    //         <p className="profile-text text-muted no-margin-bottom" >Professionalism: </p>
    //         <p className="profile-text text-muted no-margin-bottom" >Responsiveness: </p>
    //         <p className="profile-text text-muted no-margin-bottom" >Transparency: </p>
    //       </div>
    //       <div className="col-md-9">
    //         <p className="profile-text text-muted no-margin-bottom" ><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><span className="review-font"> 24 Reviews</span></p>
    //         <p className="profile-text text-muted no-margin-bottom" ><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><span className="review-font"> 24 Reviews</span></p>
    //         <p className="profile-text text-muted no-margin-bottom" ><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><span className="review-font"> 24 Reviews</span></p>
    //         <p className="profile-text text-muted no-margin-bottom" ><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><span className="review-font"> 24 Reviews</span></p>
    //         <p className="profile-text text-muted no-margin-bottom" ><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><span className="review-font"> 24 Reviews</span></p>
    //         <p className="profile-text text-muted no-margin-bottom" ><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><i className="fa fa-1x fa-star maven-purple-color sr-icons"></i><span className="review-font"> 24 Reviews</span></p>
    //       </div>
    //     </div>
    //   </div>
    // );
    return (
      <div className="profile-section no-padding-bottom">
        <div className="row">
          <div className="col-md-2">

          </div>
        { profileData.logo_url
          ? <div className="col-md-3 margin-bottom-20">
              <img src={profileData.logo_url} alt="..." className="img-rounded profile-logo"  />
            </div>
          : ('')
        }
          <div className="col-md-7">
            <p className="profile-text profile-main-text text-muted no-margin-top" ><span className="company-name-header">{profileData.name}</span> - {profileData.platform_type === 'lender' ? 'Lender' : 'Borrower'}</p>
            <p className="profile-text profile-main-text text-muted no-margin-top" ><span className='border-2'>{profileData.operating_type}</span></p>
            {!isEmpty(profileData.url) ? (
              <a href={urlParsed.href} target="_blank" >
                <button className="platform-button no-text-transform url-view-button left-align" type="submit">Visit Company Website</button>
              </a>
            ) : ('')}
          </div>
        </div>
      </div>
    );
  }
}

// {/* <div className="row">
//   <div className="col-md-12">
//     <p className="profile-text text-muted click-able" onClick={()=>{this.handleRatingClick()}} ><span className="profile-main-text header-font">Rating: </span>
//       <i className="fa fa-1x fa-star maven-purple-color sr-icons"></i>
//       <i className="fa fa-1x fa-star maven-purple-color sr-icons"></i>
//       <i className="fa fa-1x fa-star maven-purple-color sr-icons"></i>
//       <i className="fa fa-1x fa-star maven-purple-color sr-icons"></i>
//       <i className="fa fa-1x fa-star maven-purple-color sr-icons"></i>
//       <span className="review-font"> 24 Reviews</span>
//     </p>
//     {ratingBox}
//   </div>
// </div> */}

export default CompanyHeader;
