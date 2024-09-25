import './Home.css';
import ReviewList from './ReviewList'
import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import useFetch from './useFetch';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const westTeams = {"Dallas Mavericks": "Southwest", "Denver Nuggets": "Northwest",
    "Golden State Warriors": "Pacific", "Houston Rockets": "Southwest", "Los Angeles Clippers": "Pacific", "Los Angeles Lakers": "Pacific", 
    "Memphis Grizzlies": "Southwest", "Minnesota Timberwolves": "Northwest", 
    "New Orleans Pelicans": "Southwest", "Oklahoma City Thunder": "Northwest", 
    "Phoenix Suns": "Pacific", "Portland Trail Blazers": "Northwest", "Sacramento Kings": "Pacific",
    "San Antonio Spurs": "Southwest", "Utah Jazz": "Northwest"}

const eastTeams = {"Atlanta Hawks": "Southeast", "Boston Celtics": "Atlantic", "Brooklyn Nets": "Atlantic",
    "Charlotte Hornets": "Southeast", "Chicago Bulls": "Central", "Cleveland Cavaliers": "Central", 
    "Detroit Pistons": "Central", "Indiana Pacers": "Central", "Miami Heat": "Southeast", "Milwaukee Bucks": "Central",
    "New York Knicks": "Atlantic", "Orlando Magic": "Southeast", "Philadelphia Sixers": "Atlantic", 
    "Toronto Raptors": "Atlantic", "Washington Wizards": "Southeast"}

function darkMode(darkModeOn, setDarkModeOn) {
    if (darkModeOn) { 
        setDarkModeOn(false); document.body.style.backgroundColor = 'rgb(255, 255, 255)';
        localStorage.setItem("darkModeOn", JSON.stringify(false))
        document.body.style.color = "#212529";
    } 
    else if (!darkModeOn) { 
        setDarkModeOn(true); document.body.style.backgroundColor = '#121212';
        if (document.getElementById('darkModeOn')){ document.getElementById("darkModeOn").variant = "dark"; }
        localStorage.setItem("darkModeOn", JSON.stringify(true))
        document.body.style.color = "#D7DADC";
    }
}

function Home() {
    const [sentiment, setSentiment] = useState("Neutral");
    const [darkModeOn, setDarkModeOn] = useState(JSON.parse(localStorage.getItem("darkModeOn")));
    const {data: teamReview, isPending, error, setData} = useFetch('http://localhost:8000/nbaTeams')
    const [sortAlpha, setSortAlpha] = useState("");
    const [sortSentiment, setSortSentiment] = useState("");
    const [filterReview, setFilterReview] = useState(null);
    const [filterReset, setFilterReset] = useState(false);

    useEffect(() => {
        darkMode(JSON.parse(localStorage.getItem("darkModeOn")), setDarkModeOn);
    }, [])

    useEffect(() => {
        if (filterReset) { setFilterReset(false); setFilterReview(null); }
    // eslint-disable-next-line
    }, [sortAlpha, sortSentiment, filterReview])

    useMemo(() => {
        let result = [];
        let review = teamReview;
        
        if (filterReview){
            review = filterReview;
        }

        if ((sortAlpha  === "ascending") && teamReview) {
            result = review.sort((a, b) => {
                return b.teamName.localeCompare(a.teamName);
            });
        }
        else if ((sortAlpha  === "descending") && teamReview) {
            result = review.sort((a, b) => {
                return a.teamName.localeCompare(b.teamName);
            });
        }
        return result;
    // eslint-disable-next-line
    }, [sortAlpha])

    useMemo(() => {
        let result = [];
        let review = teamReview;
        
        if (filterReview){
            review = filterReview;
        }

        if ((sortSentiment === "ascending") && teamReview) {
            result = review.sort((a, b) => {
                return b["sentiments"][sentiment.toLowerCase()] - a["sentiments"][sentiment.toLowerCase()];
            });
        }
        else if ((sortSentiment === "descending") && teamReview) {
            result = review.sort((a, b) => {
                return a["sentiments"][sentiment.toLowerCase()] - b["sentiments"][sentiment.toLowerCase()];
            });
        }
        return result;
    // eslint-disable-next-line
    }, [sortSentiment])

    // { team: "Boston Celtics", sentiment: "Happy", sentimentPercentage: "86%", keywords: ["championship", "tatum", "finals"], topPlayers: ["Derrick White", "Jayson Tatum", "Jaylen Brown", "Kristaps Porzingis", "Payton Pritchard"], id: 1},
    // { team: "Washington Wizards", sentiment: "Neutral", sentimentPercentage: "50%", keywords: ["rebuild", "draft", "future"], topPlayers: ["Deni Avdija", "Jordan Poole", "Bilal Coulibaly", "Kyle Kuzma", "Tyus Jones"], id: 2},
    // { team: "Phoenix Suns", sentiment: "Angry", sentimentPercentage: "70%", keywords: ["stuck", "swept", "trade"], topPlayers: ["Kevin Durant", "Devin Booker", "Bradley Beal", "Jusuf Nurkic", "Eric Gordon"], id: 3},

    function handleDelete(id) {
        const newReviews = teamReview.filter(review => review.id !== id);
        setData(newReviews);
    }

    function filterTeams(conference, division) {
        // eslint-disable-next-line
        switch(conference){
            case "East":
                if (division === "Atlantic"){
                    return setFilterReview(teamReview.filter(review => eastTeams[review.teamName] === "Atlantic"));
                }
                else if (division === "Central"){
                    return setFilterReview(teamReview.filter(review => eastTeams[review.teamName] === "Central"));
                }
                else if (division === "Southeast"){
                    return setFilterReview(teamReview.filter(review => eastTeams[review.teamName] === "Southeast"));
                }
                return setFilterReview(teamReview.filter(review => eastTeams[review.teamName]));
            case "West":
                if (division === "Northwest"){
                    return setFilterReview(teamReview.filter(review => westTeams[review.teamName] === "Northwest"));
                }
                else if (division === "Pacific"){
                    return setFilterReview(teamReview.filter(review => westTeams[review.teamName] === "Pacific"));
                }
                else if (division === "Southwest"){
                    return setFilterReview(teamReview.filter(review => westTeams[review.teamName] === "Southwest"));
                }
                return setFilterReview(teamReview.filter(review => westTeams[review.teamName]));
            // setData( tr.filter ())
        } 
        /*
        if ((teamReview.teamName in eastTeams) || region === "East"){
            const newReviews = teamReview.filter(review => eastTeams[review.teamName] === "Southeast");
            setData(newReviews);
        }
        else {
            const newReviews = teamReview.filter(review => westTeams[review.teamName] === "Pacific");
            setData(newReviews);
        } */
    }

    /* 
     1. Use static list to created in csv cleaner file to grab team name
     2. Grab team targeted sentiment scores from csv cleaner file
     3. Use a term frequency algorithm to grab the top 5 words that appear the most within the csv file
     4. Use nba_api to match top 3 nba players on the csv of their respective team that are mentioned the most
     5. JSON now available to grab data from on React's end
    */ 

    return (
        <div className="Home">
            <br/>
            <h1 style={{textAlign: "center"}}>NBA Twitter Sentiment Analysis </h1>
            <div style={{width: "50%", display: "inline-block", textAlign: "center"}}>
                <h2> Current Sentiment: {sentiment}</h2>
                <Button id="btn" onClick={() => setSentiment("Positive")}>Sentiment Change - 😃</Button> 
                <Button id="btn" onClick={() => setSentiment("Neutral")}>Sentiment Change - 😐</Button> 
                <Button id="btn" onClick={() => setSentiment("Negative")}>Sentiment Change - 😡</Button> <br /> <br />
                <span/>
                <h2> Dark Mode On? {JSON.parse(localStorage.getItem("darkModeOn")) ? "✅" : "❌"}</h2>
                <Button style={{borderColor: "black"}} variant={darkModeOn ? "dark" : "light"} id="darkModeBtn" onClick={ () => darkMode(darkModeOn, setDarkModeOn) }>
                {JSON.parse(localStorage.getItem("darkModeOn")) ? "Toggle Dark Mode - ⚫️" : "Toggle Dark Mode - ⚪️"}</Button>
            </div>
            <div style={{width: "50%", display: "inline-block", textAlign: "center"}}>
                <h2> Sorting Options </h2>
                <Button id="btn" className="btn btn-primary" onClick={() => setSortAlpha(sortAlpha === "ascending" ? "descending" : "ascending")} style={{backgroundColor: "rgb(29, 66, 138)"}}> Sort Reviews Alphabetically {sortAlpha === "ascending" ? "↓" : "↑"} </Button>
                <Button id="btn" className="btn btn-primary" onClick={() => setSortSentiment(sortSentiment === "ascending" ? "descending" : "ascending")} style={{backgroundColor: "rgb(29, 66, 138)"}}> Sort Reviews By Sentiment {sortSentiment === "ascending" ? "↓" : "↑"} </Button>
                <br/>
                <br/>
                <h2> Filter Options</h2>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <UncontrolledDropdown direction='down'>
                        <DropdownToggle id="btn" caret color='primary'>Conference</DropdownToggle>
                        <DropdownMenu style={{width: "100px"}}>
                            <DropdownItem onClick={() => filterTeams("West")}>West</DropdownItem>
                            <DropdownItem onClick={() => filterTeams("East")}>East</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown direction='down'>
                        <DropdownToggle id="btn" caret color='primary'>Division</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => filterTeams("East", "Atlantic")}>Atlantic</DropdownItem>
                            <DropdownItem onClick={() => filterTeams("East", "Central")}>Central</DropdownItem>
                            <DropdownItem onClick={() => filterTeams("East", "Southeast")}>Southeast</DropdownItem>
                            <DropdownItem onClick={() => filterTeams("West", "Northwest")}>Northwest</DropdownItem>
                            <DropdownItem onClick={() => filterTeams("West", "Pacific")}>Pacific</DropdownItem>
                            <DropdownItem onClick={() => filterTeams("West", "Southwest")}>Southwest</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <Button className="btn btn-danger" onClick={() => setFilterReset(true)} style={{marginTop: "5px", marginBottom: "5px"}} > Reset </Button>
            </div>
            <br/>
            <br/>
            {error && <div className="alert alert-danger">{error}</div>}
            {isPending && <div>Loading...</div>}
            <h2> <b> Teams Reviewed </b> </h2>
            {teamReview && <ReviewList darkModeOn={darkModeOn} teamReview={teamReview} filterReset={filterReset} filterReview={filterReview} sentiment={sentiment} handleDelete={handleDelete}/>}
        </div>
    );
}

export default Home;