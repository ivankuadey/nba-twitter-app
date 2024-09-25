import './About.css';
import Table from 'react-bootstrap/Table';

export default function About() {

    return (
        <div className="About">
            <br/>
            <h2> About This Project </h2>
            <p> By: Ivan Kuadey</p>
            <p> Tweets were collected from April 23rd, 2024 to June 19th, 2024. </p>
            <p> 2000 Tweets were analyzed for each team. </p>
            <p> AWS Comprehend used to perform sentiment analysis. </p>
            <br/>
            <h2> Update History </h2>
            <Table bordered size='sm' style={{width: "65%", margin: "auto"}}>
                <thead>
                    <tr>
                        <th>
                            Version
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Notes
                        </th>
                    </tr>
                </thead>
                <tbody className='table-primary'>
                    <tr>
                        <th scope='row'>
                            1.0
                        </th>
                        <td>
                            9/24/2024
                        </td>
                        <td>
                        - Launch edition 🥳 <br/> - Dark mode included 😎 <br/>
                        - Covers all 30 NBA teams with sorting/filtering options for users to evaluate and explore team Tweets.
                        <br/> 
                        </td>
                    </tr>
                </tbody>
            </Table>
            <br/>
            <h2> Feature Wishlist </h2>
            <p>1. Real-time data collection/analyzation of Tweets </p>
            <p>2. Store data in a cloud database</p>
            <p></p>
        </div>
    );
}
