import './reviewList.css';
import { Tweet } from 'react-tweet';

function ReviewList({ darkModeOn, teamReview, filterReview, filterReset, sentiment, handleDelete }){
    let currSentiment = sentiment.toLowerCase();

    if (filterReview && !filterReset){
        return(
            <div className="review-list">
                {filterReview.map((review) => (
                    <div className="review" key={review.id}>
                        <div className="review-info" >
                            <h2>{review.teamName}</h2>
                            <p className={currSentiment + "-info"}> <b>{review.sentiments[currSentiment]}</b> Tweets are {sentiment}!</p>
                            <p> Most Frequent Words: <b>"{Object.keys(review.freqWords).toString().replaceAll(',', '"  | "').toString().toUpperCase()}"</b> </p>
                            <p> Top Players Mentioned: <b>"{Object.keys(review.mentionedPlayers).toString().replaceAll(',', '"  | "').toString().toUpperCase()}"</b> </p>
                        </div>
                        <h3> 🔥 Top Tweet 🔥 </h3>
                        {
                            // <TwitterTweetEmbed tweetId={review.topTweet["Tweet Id"]} placeholder="loading tweet..." theme="dark" key="1" /> 
                        }
                        <div className={darkModeOn ? 'dark' : 'light'} style={{justifyContent: "center", display: "flex", marginTop: "0px", paddingTop: "0px" }}>    
                            <Tweet id={review.topTweet["Tweet Id"]}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    else {
        return(
            <div className="review-list">
                {teamReview.map((review) => (
                    <div className="review" key={review.id}>
                        <div className="review-info" >
                            <h2>{review.teamName}</h2>
                            <p className={currSentiment + "-info"}> <b>{review.sentiments[currSentiment]}</b> Tweets are {sentiment}!</p>
                            <p> Most Frequent Words: <b>"{Object.keys(review.freqWords).toString().replaceAll(',', '"  | "').toString().toUpperCase()}"</b> </p>
                            <p> Top Players Mentioned: <b>"{Object.keys(review.mentionedPlayers).toString().replaceAll(',', '"  | "').toString().toUpperCase()}"</b> </p>
                        </div>
                        <h3> 🔥 Top Tweet 🔥 </h3>
                        {
                            // <TwitterTweetEmbed tweetId={review.topTweet["Tweet Id"]} placeholder="loading tweet..." theme="dark" key="1" /> 
                        }
                        <div className={darkModeOn ? 'dark' : 'light'} style={{justifyContent: "center", display: "flex", marginTop: "0px", paddingTop: "0px" }}>    
                            <Tweet id={review.topTweet["Tweet Id"]}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ReviewList;