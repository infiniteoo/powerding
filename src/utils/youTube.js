/* eslint-disable no-useless-escape */

export const extractVideoID = (url) => {
  var regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    //error
  }
};

export const extractVideoTimeStamp = (url) => {
  let regExp =
    /^.*?(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)(?:(\?t|&start)=(\d+))?.*/;

  let match = url.match(regExp);
  if (match) {
    return match[4];
  }
};
