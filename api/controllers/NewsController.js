
import responseHandler from '../helpers/responseHelper';

export function getNews(req, res){
  const fakeNews = [
    {title: 'News event', date: '07/21/17', content: 'Twin Brook Capital raises $2.3B', url: 'http://www.businesswire.com/news/home/20170719005697/en/Angelo-Gordon%E2%80%99s-Twin-Brook-Capital-Partners-Raises'},
    {title: 'News event', date: '06/27/17', content: 'Bain BDC raises $1.26B', url: 'https://www.privatedebtinvestor.com/news_and_analysis/2017/june/news/bain_pulls_in_$1_26bn_for_bdc/?utm_source=Sailthru&utm_medium=email&utm_campaign=PDI%20DAILY%20US%20BRONZE%202017-06-27&utm_term=PDI_DAILY_US_BRONZE'},
    {title: 'News event', date: '06/01/17', content: 'Twin Brook raises $2B Fund II', url: 'https://www.privatedebtinvestor.com/news/2017-05-31/twin-brook-garners-over--2bn-for-second-fund---exclusive/?utm_source=Sailthru&utm_medium=email&utm_campaign=New%20Campaign&utm_term=PDI%20Alert%20Smart%20List'},
    {title: 'News event', date: '05/20/17', content: 'GoldPoint raises $1.3B junior debt fund', url: 'https://www.privatedebtinvestor.com/news_and_analysis/2017/may/news/goldpoint_raises_$1_3_billion_for_junior_debt_fund/?utm_source=Sailthru&utm_medium=email&utm_campaign=PDI%20DAILY%20US%20BRONZE%202017-05-17&utm_term=PDI_DAILY_US_BRONZE'},
    {title: 'News event', date: '04/20/17', content: 'Strongest Q1 since 2007,2,643 mid mkt deals', url: 'https://www.themiddlemarket.com/data/the-middle-market-delivered-the-best-q1-since-2007'},
    {title: 'News event', date: '04/20/17', content: 'KKR raises $400M Sr debt fund', url: 'https://www.privatedebtinvestor.com/news/north-america/2017-04-20/kkr-locks-down-more-than--400m-for-senior-debt---update/'},
    {title: 'News event', date: '04/19/17', content: 'BC Partners launches $200M debt fund', url: 'https://www.privatedebtinvestor.com/news/europe/2017-04-19/bc-partners-to-launch--200m-opportunistic-fund-%E2%80%93-exclusive/?utm_source=Sailthru&utm_medium=email&utm_campaign=PDI%20DAILY%20US%20BRONZE%202017-04-20&utm_term=PDI_DAILY_US_BRONZE'},
    {title: 'News event', date: '04/19/17', content: 'Portfolio Advisors raises $740M Jr debt Fund II', url: 'https://www.privatedebtinvestor.com/news/north-america/2017-04-19/portfolio-advisors-raises--740m-for-junior-debt/#sthash.p3J9Hsz4.dpuf'},
    {title: 'News event', date: '04/13/17', content: 'Golub surpasses $1B goal, GCP 11', url: 'https://www.privatedebtinvestor.com/news/north-america/2017-04-13/latest-golub-fund-surpasses--1bn-goal/?utm_source=Sailthru&utm_medium=email&utm_campaign=PDI%20DAILY%20US%20BRONZE%202017-04-17&utm_term=PDI_DAILY_US_BRONZE'},
    {title: 'News event', date: '04/10/17', content: 'Carlyle raising new $1.5B debt fund', url: 'https://www.privatedebtinvestor.com/news_and_analysis/2017/april/news/carlyle_raising_new_$1_5bn_debt_fund/'},
    {title: 'News event', date: '04/06/17', content: 'HarbourVest closes $375M mezz fund', url: 'https://www.privatedebtinvestor.com/news/north-america/2017-04-06/harbourvest-closes-mezz-fund-on--375m/'},
  ];
  return responseHandler(res, 'Success', 'You got News', fakeNews);
}
