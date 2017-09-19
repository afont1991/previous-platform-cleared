import React, { Component } from 'react';
import EmailModalExtraButton from '../emailModal/EmailModalExtraButton';
import { fromJS } from 'immutable';

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange('word', 'password_2')
  componentWillMount(){
    this.setState({
      contactUsForm: {
        message: "",
        email: "",
        name: ""
      }
    })
  }
  componentDidMount() {
    let screenHeight = screen.height * .8;
    let mainHeader = document.getElementById("mainHeader");
    mainHeader.style.height = screenHeight + "px";
  }
  handleChange(e) {
    this.setState(fromJS(this.state).setIn(["contactUsForm", e.target.id], e.target.value).toJS());
  }
  render() {
    const JordanImage = require('../../Assets/images/jordan-profile.jpg');
    const AndrewImage = require('../../Assets/images/andrew-profile.jpg');
    const MapImage = require('../../Assets/images/debt-map.png');
    return (
      <div>
        <header id="mainHeader">
          <div className="header-content">
            <div className="header-content-inner">
              <h1 id="homeHeading">Middle Market</h1>
              <h1 id="homeHeading">Debt Financing Made Easy</h1>
              <hr className='home-page-header-seperator'/>
              <EmailModalExtraButton />
            </div>
          </div>
        </header>
        <section className="bg-primary" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h2 className="section-heading">What is DebtMaven?</h2>
                <hr className="light"/>
                <p>
                  A platform for middle market borrowers, lenders and service providers to transact with each other for debt capital financings.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-users text-primary sr-icons"></i>
                  <h3>Expand your network</h3>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-exchange text-primary sr-icons"></i>
                  <h3>Manage the process</h3>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="service-box">
                  <i className="fa fa-4x fa-line-chart text-primary sr-icons"></i>
                  <h3>Make data-driven decisions</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Customers</h2>
                <hr className="primary"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">CEOs & CFOs</h2>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Private Equity</h2>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Debt Funds</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">BDCs</h2>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Regional Banks</h2>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Family Offices</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Investment Banks</h2>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Law Firms</h2>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="customer-box">
                  <h2 className="">Accounting Firms</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="secondary-content-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="section-heading">Financings</h2>
                <hr className="primary"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 text-center">
                <h2 className="section-heading">Types of capital</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Revolvers</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">First Lien</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Unitranche</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Second Lien</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Mezzanine</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Equity Co-Investment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <h2 className="section-heading">Scenarios</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Acquisition</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Recapitalization</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Refinancing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Management Buyout</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Restructuring</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="itemCapsule blue-background">
                          <p className="">Growth Capital</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 text-center">
                <h1 className="section-heading">Management</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img className="content-image" src={JordanImage} alt="screenshot" />
              </div>
              <div className="col-md-8">
                <h1 className="no-margin-top">Jordan Selleck, CEO</h1>
                <p>Jordan spent six years in cross-border investment banking advising global corporates and private equity firms on M&A deals up to $250 million. From pig farms to printers, and car components to cardboard boxes, Jordan worked on deals in a wide array of industries.</p>
                <p>Jordan has also advised startups and SMBs in MMA apparel, nutritional supplements, real estate technology, content marketing, daycares and dentistry.</p>
                <p>Jordan was born in San Diego, grew up in North Carolina and attended UNC-Chapel Hill. He has traveled to 32 countries, lived in China for 18 months, trains Brazilian Jiu-Jitsu, is a private pilot, SCUBA dives and speaks Mandarin Chinese.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="services">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h1 className="no-margin-top">Andrew Font, CTO</h1>
                <p>Andrew is a fullstack developer with extensive FinTech experience. Prior to co-founding DebtMaven, he built and sold CryptoStreet, a cryptocurrency-exclusive trading platform . Previously, he was a developer at ADP's innovation lab (Lifion), and before that, a developer at Liquidnet Capital Markets, where he built the Issuer Platform.</p>
                <p>Andrew also built and launched Rumblr, the "Tinder for fighting", which was an internationally successful viral marketing hoax reaching 2M people and 100K visitors in less than 48 hours. Rumblr was featured in TechCrunch & Vice News.</p>
              </div>
              <div className="col-md-4">
                <img className="content-image" src={AndrewImage} alt="screenshot" />
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="secondary-content-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="section-heading">Contact Us</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">

              </div>
              <div className="col-md-6">
                <h2 className="section-heading">Location</h2>
                <div className="row">
                  <div className="col-md-8">
                    <img className="content-image2" src={MapImage} alt="screenshot" />
                  </div>
                  <div className="col-md-4">
                    <p className="profile-text no-margin-bottom"><strong>Address:</strong></p>
                    <p className="profile-text no-margin-bottom">17th Floor</p>
                    <p className="profile-text no-margin-bottom">1460 Broadway</p>
                    <p className="profile-text no-margin-bottom">New York</p>
                    <p className="profile-text no-margin-bottom">NY 10036</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePageComponent;
