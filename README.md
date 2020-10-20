<<<<<<< HEAD
# GoMeeting-K8S
This is GoMeeting events app deployed on Kubernetes 
=======
# GoMeeting

<h1><a href="https://go-meeting.herokuapp.com/" target="_blank">GoMeeting Link</a></h1>

<h2>Demo Accounts</h2>

- guest@gmail.com(pass:go@123456)
- test@gmail.com(pass:go@123456)

<hr>
Go Meeting: Web app built using Express js and React Platform. It's used to organize online groups that host in-person events for people with similar interests. The primary purpose of making this application is to use the technology and skills I've learned recently and applied them to a real project to get some hands-on experience.

<h2>Usage</h2>
<hr>

1. The login or signup in the landing page by clicking on 'Join GoMeeting'

!["One"](api/Readme/step1.jpg)

2. The user get redirected to Auth0 login page for authentication

!["two"](api/Readme/step2.jpg)

3. After the loggin successfully, the user will sent the home page, where the user can browse the upcoming events scheduled by other users/hosts

!["three"](api/Readme/step3.jpg)

4. Clicking attend button, will add the event to the user's booked Events list, and from this list, the user can cancel his booking.

!["four"](api/Readme/step4.jpg)

5. The use can host/schedule his own event by going to Hosted Events page, also he/she can cancel the hosted event or check who booked his events

   Note: if the user/host cancel his event, the event will be deleted from the booked page for each user signed up to attend this event.

!["five"](api/Readme/step5.jpg)

<h2>Video Demo</h2>

!["Video"](api/Readme/GoMeeting.gif)

<hr>

<h2>Technology Used</h2>

<table>
<tr>
<th>Technology</th>

<th>Link</th>

</tr>
<tr>
<td>React</td>
<td>https://reactjs.org/</td>
</tr>
<tr>
<td>Redux</td>
<td>https://redux.js.org/</td>
</tr>
<tr>
<td>React Bootstrap</td>
<td>https://react-bootstrap.github.io/</td>
</tr>
<tr>
<td>Auth0</td>
<td>https://auth0.com/</td>
</tr>
<tr>
<td>GraphQL</td>
<td>https://graphql.org/</td>
</tr>
<tr>
<tr>
<td>NodeJS</td>
<td>https://nodejs.org/en/</td>
</tr>
<tr>
<td>ExpressJS</td>
<td>https://expressjs.com/</td>
</tr>
<tr>
<td>Javascript</td>
<td></td>
</tr>
<tr>
<td>CSS3</td>
<td></td>
</tr>
<tr>
<td>Bootstrap</td>
<td>https://getbootstrap.com/</td>
</tr>
<tr>
<td>Google Fonts</td>
<td>https://fonts.google.com/</td>
</tr>
<tr>
<td>GitHub</td>
<td>https://github.com/</td>
</tr>
<tr>
<td>Heroku</td>
<td>https://www.heroku.com/</td>
</tr>
<tr>
<td>Node Package Manager(NPM)</td>
<td>https://www.npmjs.com/</td>
</tr>
</table>
<hr>

<h2>Learning Points</h2>

- Using Auth0 API to add authentication service to my app
- Using GraphQL query language API to increase the performance and speed compared to Rest API
- Using Redux Library to manage the application states.
<hr>

<h2>Author</h2>
<hr>

- <a href="http://portfolio.hishamsaymeh.com">Portfolio</a>
- <a href="https://www.linkedin.com/in/hisham-saymeh">LinkedIn</a>
- <a href="https://github.com/hishamss">GitHub</a>
>>>>>>> K8S_deployment
