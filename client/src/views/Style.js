import styled from 'styled-components';

export const Style = styled.div`

body {
  margin: 0;
  padding-bottom: 10%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}


.container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #595655;
}

.box{
  width:40%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.center{
  text-align: center;
  color: #64bf15;
  font-size: 25px;
}


form {
  border: 3px solid #f1f1f1;
  width: 90%;
}

/* Full-width inputs */
input[type=text], input[type=password] , input[type=email]{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}


`;
