# MyZone

A web application that mimics the features and functionalities of popular social media platforms. Users can create profiles, send and accept friend requests, share posts, react and comment on them, feature photos on their profile, find users based on their interests, and find users who have friends in common.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Express: A web framework for Node.js that provides features for web and mobile applications.
- WebSocket: A protocol that enables two-way communication between a client and a server over a single TCP connection.
- MySQL: A relational database management system that stores and retrieves data.
- Redux: A state management tool for React that helps to write applications that behave consistently and are easy to test.
- Migratify: A self-developed database migration tool that simplifies the process of creating and updating database schemas. (<https://www.npmjs.com/package/migratify>)

## Features

- Authentication: Users can sign up, log in, and log out using their email and password.
- Profile: Users can edit their profile information, such as name, bio, location, interests, and profile picture. They can also feature up to three photos on their profile page.
- Friends: Users can send and receive friend requests, accept or decline them, and view their friends list. They can also see the number of mutual friends they have with other users.
- Posts: Users can create text or image posts, edit or delete them, and view them on their own or other users' profile pages. They can also see the number of reactions and comments on each post.
- Reactions: Users can react to posts. They can also see the total number of reactions on each post.
- Comments: Users can comment on posts, edit or delete them, and view them on the post page.
- Feed: Users can see the latest posts from their friends and themselves on their home page. 
- Search: Users can search for other users by name, email, or interest 
- Notifications: Users can see the notifications of friend requests, reactions, and comments on their posts in real-time.

## Key Points:
 - Developed a subscription system in React to enable the parent components to trigger the child components or a completely separate component to call a function when some specific events are raised.
 - Used a single SQL query to find all the users with at least one common friend but not friends with the user.
 - Implemented clustering to load balance the server into the different CPU cores to enhance performance.

## How to run it locally using docker

Instructions are provided in the readme of the <a href="https://github.com/shahriarKabir44/myZone-API">Main Backend</a>.

## Related Repositories

<ol>
    <li>
        <a href="https://github.com/shahriarKabir44/myZone-API">Main Backend</a>
    </li>
    <li>
       <a href="https://github.com/shahriarKabir44/myZone-WS-server">WebSocket Server</a>
    </li>

</ol>
