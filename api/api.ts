import type { IData } from '~/types/types';

export const BASE_PATH = 'https://624095ad-333c-431f-b692-1b04579e93cd.mock.pstmn.io/';

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_PATH}data`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data);
    return data.data as IData[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
