import { normalize, schema } from 'normalizr';
import { ACCESS_TOKEN } from '../constants';
const baseUrl = '';

async function get(endpoint, token = null) {
    let options = {
        method: 'GET',
        
    };
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) throw Error(json.message);
    return json;
};

async function post(endpoint, body, token = null) {
    let options = {
        method: 'POST',
        body: JSON.stringify(body)
    };
    
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) {
    if (response.status === 422) {
        json.errors.forEach(error => {
        throw Error(`${error.param} ${error.msg}`);
        });
    }

    throw Error(json.message);
    }

    return json;
};

export async function join(body){
    return await post(`api/join`, body);
}

export async function unjoin(body){
    return await post(`api/unjoin`, body);
}

export async function login(loginRequest){
    return await post(`api/auth/signin`, loginRequest);
}

export async function signup(signupRequest){
    return await post(`api/auth/signup`, signupRequest);
}

export async function checkUsernameAvailability(username){
    return await get(`api/user/checkUsernameAvailability?username=` + username);
}

export async function checkEmailAvailability(email){
    return await get(`api/user/checkEmailAvailability?email=` + email);
}

export async function createAPost(newPost){
    return await post(`api/posts`,newPost);
}

export async function saveAPost(body){
    return await post(`api/posts/save`,body);
}

export async function unsaveAPost(body){
    return await post(`api/posts/unsave`,body);
}

export async function createAComment(body){
    return await post(`api/comments`,body);
}

export async function getPosts(channel,sortby) {
    return await get(`api/posts/${channel}/${sortby}`);
}

export async function getPostsByUserId(userId) {
    return await get(`api/posts/user/${userId}`);
}

export async function getSavedPostsByUserId(userId) {
    return await get(`api/posts/usersaved/${userId}`);
}

export async function getVotedPostsByUserId(userId) {
    return await get(`api/posts/uservoted/${userId}`);
}

export async function getUpVotedPostsByUserId(userId) {
    return await get(`api/posts/byUserUpvote/${userId}`);
}

export async function getDownVotedPostsByUserId(userId) {
    return await get(`api/posts/byUserDownvote/${userId}`);
}

export async function getSearchedPosts(queryTerm) {
    return await get(`api/posts/search/${queryTerm}`);
}

export async function getSortedPosts(sortby) {
    return await get(`api/posts/sortby/${sortby}`);
}

export async function getAPost(postId) {
    return await get(`api/posts/${postId}`);
}

export async function createVotePost(body) {
    return await post(`api/post/get-voted`, body);
}

export async function getTop5Channels() {
    return await get(`api/channels/top5`);
}

export async function getChannelDetails(channelId){
    return await get(`api/channels/details/${channelId}`);
}

export async function getChannelbyUserId(userId){
    return await get(`api/channels/user/${userId}`);
}

export async function getCommentsby(postId){
    const normalizedData = normalize(await get(`api/comments/ofapost/${postId}`), postSchema);
    return normalizedData.entities;
}

export async function getCommentsByUserId(userId) {
    return await get(`api/comments/user/${userId}`);
}

export async function getUserDetails(userId){
    return await get(`api/users/${userId}`);
}

const user = new schema.Entity("users");

const createdBy = new schema.Entity("createdBys", {
    userCom: user
},{idAttribute:'userCom'});

const child = new schema.Entity("children", {
    createdBy: createdBy,
});

const comment = new schema.Entity("comments", {
    createdBy: createdBy,
    children: [child]
});

const postSchema = new schema.Entity("posts", {
    comments: [comment]
})

