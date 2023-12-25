# MyZone

A full-stack web application that mimics the features and functionalities of popular social media platforms. Users can create profiles, send and accept friend requests, share posts, react and comment on them, feature photos on their profile, find users based on their interests, and find users who have friends in common.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Express: A web framework for Node.js that provides features for web and mobile applications.
- WebSocket: A protocol that enables two-way communication between a client and a server over a single TCP connection.
- MySQL: A relational database management system that stores and retrieves data.
- Redux: A state management tool for React that helps to write applications that behave consistently and are easy to test.
- Migratify: A self-developed database migration tool that simplifies the process of creating and updating database schemas. (https://www.npmjs.com/package/migratify)

## Features

- Authentication: Users can sign up, log in, and log out using their email and password.
- Profile: Users can edit their profile information, such as name, bio, location, interests, and profile picture. They can also feature up to three photos on their profile page.
- Friends: Users can send and receive friend requests, accept or decline them, and view their friends list. They can also see the number of mutual friends they have with other users.
- Posts: Users can create text or image posts, edit or delete them, and view them on their own or other users' profile pages. They can also see the number of reactions and comments on each post.
- Reactions: Users can react to posts with emojis, such as like, love, wow, sad, or angry. They can also see the total number of reactions and the breakdown of each reaction on each post.
- Comments: Users can comment on posts, edit or delete them, and view them on the post page. They can also see the number of replies and the timestamp of each comment.
- Feed: Users can see the latest posts from their friends and themselves on their home page. They can also filter the posts by text or image, and sort them by date or popularity.
- Search: Users can search for other users by name, email, or interest. They can also see the profile picture, bio, and location of each user in the search results.
- Notifications: Users can see the notifications of friend requests, reactions, and comments on their posts. They can also mark the notifications as read or unread, and clear them all.

## How to run it locally using docker:
- Clone this repository.
- Run the MySQL docker image
```bash 
sudo docker run -p  3300:3306 --name myzone_mysql -e MYSQL_ROOT_PASSWORD=<password> -e MYSQL_DATABASE=find_home -d mysql:latest
```
- Create the database schema.
- - Install Migratify globally (if not installed)
```bash
npm install -g migratify
```
- - Run 
```bash
migratify clear
```
- - Run the following command to create the database.
```
migratify create-db
```

- - Run the following command to create the schema.
```bash
migratfy migrate
```
- Now stop the MySQL image.

```bash 
sudo docker stop myzone_mysql
```
- Open the docker-compose.yml file and put your database password
- Run the project
```bash 
sudo docker-compose up
```

## Related Repositories:
<ol>
    <li>
        <a href="https://github.com/shahriarKabir44/myZone-API">Main Backend</a>
    </li>
    <li>
       <a href="https://github.com/shahriarKabir44/myZone-WS-server">WebSocket Server</a> 
    </li>
    
</ol>


