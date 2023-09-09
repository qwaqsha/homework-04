import fetch from 'node-fetch';

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

type Post = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const getData = async (url: string): Promise<Post[]> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json()) as Post[];
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
    } else {
      console.log('unexpected error: ', error);
    }
    throw new Error('Error!'); //!
  }
};

getData(COMMENTS_URL).then((data) => {
  data.forEach((x) => {
    const { id, email } = x;
    console.log('ID:', id + ',', 'Email:', email);
  });
});

/**
 * ID: 1, Email: Eliseo...
 * ID: 2, Email: Jayne_Kuhic...
 * ID: 3, Email: Nikita...
 * ID: 4, Email: Lew...
 * ...
 */
