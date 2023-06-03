interface ApiRequestType {
  endpoint: string;
  method: string;
  body: BodyInit;
}

interface  ApiResponseType{
    status: number;
    data: object;
}

export default async ({ endpoint, method, body }: ApiRequestType) : Promise <ApiResponseType> => {
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
      body,
    }
  );

  const status = response.status;
  const data = await response.json();

  return { data, status };
};
