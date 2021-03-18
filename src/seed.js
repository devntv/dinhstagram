/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'hkGuBRXkcFdJPbRr6w4xTv9EegG3',
        username: 'devntv',
        fullName: 'NT Vinh Nguyen',
        emailAddress: 'binkool281132442n@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'TestBot',
        fullName: 'TestBot',
        emailAddress: 'testbot@gmail.com',
        following: [],
        followers: ['hkGuBRXkcFdJPbRr6w4xTv9EegG3'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'leesin',
        fullName: 'Long-kick Leesin',
        emailAddress: 'kick@leesin.com',
        following: [],
        followers: ['hkGuBRXkcFdJPbRr6w4xTv9EegG3'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'yasuo',
        fullName: 'Hasagi Yasuo',
        emailAddress: 'hasagi@yasuo.com',
        following: [],
        followers: ['hkGuBRXkcFdJPbRr6w4xTv9EegG3'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/testbot/${i}.jpg`,
          caption: 'welcome to dinhstagram socials',
          likes: [],
          comments: [
            {
              displayName: 'Leesin',
              comment: 'Hello world. im here and i am the best jungle!'
            },
            {
              displayName: 'Yasuo',
              comment: 'Solo with me, i will be Hasagi You then kill you in one minute, are you ready?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
}
