interface ApiRequestType {
  endpoint: string;
  method: string;
  body?: object;
}

interface  ApiResponseType <T, E>{
    status: number;
    data: T | E;
}

export default async <T, E>({ endpoint, method, body }: ApiRequestType) : Promise <ApiResponseType<T, E>> => {
  //parse the string to JSON

  const authorization = ""

  const response = await fetch(
    `https://dev.hisptz.com/dhis2/api/dataStore/brianNkwera${endpoint}`,
    {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization,
      },
      body: JSON.stringify(body),
    }
  );

  const status = response.status;
  const data = await response.json();

  return { data, status };
};
