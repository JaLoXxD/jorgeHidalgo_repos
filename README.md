# NNT DATA CHALLENGE (NodeJs + Ts)

## Requisites

Node v16.16.0

TS v^4.8.4

## Steps to run it

- First, clone the repository.

```
git clone https://github.com/JaLoXxD/jorgeHidalgo_repos
```

- Open it in an editor.

-Run 

```
npm install
```

-After that, run

```
npm run dev
```

-Finally, you should see this

![image](https://user-images.githubusercontent.com/65001908/194731517-7fcf3974-d3e6-4589-b047-6198e3df3da8.png)


## Testing

-After run npm install, run

```
npm test
```

-You should see this.

![image](https://user-images.githubusercontent.com/65001908/194731510-e4e7901e-139e-429e-a30b-b3cd1da37743.png)

## EndPoints

### CREATE MOCK DATA (POST)

http://localhost:8082/api/v1/repository-mock

### GET MOCK DATA (GET)

http://localhost:8082/api/v1/repository-mock

![image](https://user-images.githubusercontent.com/65001908/194731648-ba9a6f14-4b2a-4f16-a215-e81d3d6e014e.png)

### CREATE ORGANIZATION (POST)

http://localhost:8082/api/v1/organization

#### Body

```
{
  "organization":{
        "id_organization": int,
        "name": string,
        "status" int,
   },
   "tribe":{
        "name": string,
        "status": int,
    },
   "repositories":[
    {
        "name": string,
        "state": string ("E" | "D" | "A"),
        "status": string ("A" | "I"),
        "create_time": date (yyyy-mm-dd),
        "metrics":{
            "coverage": int,
            "bugs": int,
            "vulnerabilities": int,
            "hotspot": int,
            "code_smells": int
        }
    }
    ...
   ]
}
```

### UPDATE ORGANIZATION (PUT)

http://localhost:8082/api/v1/organization

#### Body

```
{
  "name": string,
  "status" int,
}
```

#### Response

![image](https://user-images.githubusercontent.com/65001908/194731845-c2a47bfb-03ee-4810-ab84-e785cca6e896.png)

### DELETE ORGANIZATION (DELETE)

http://localhost:8082/api/v1/organization/:organizationId

#### Response

![image](https://user-images.githubusercontent.com/65001908/194731871-4ec21eaf-aedb-4d74-9ed7-9718a3249df9.png)

### GET ORGANIZATIONS (GET)

http://localhost:8082/api/v1/organization


#### Response 

Array of organizations with their tribes, repositories and metrics.

### GET METRICS BY TRIBE ID (GET)

http://localhost:8082/api/v1/metrics/:tribeId

#### Response 

Array of repositories with their metrics and organization name.

![image](https://user-images.githubusercontent.com/65001908/194731932-731092b5-0b11-48e4-8cb5-1a418ef1f857.png)

### GET METRICS CSV BY TRIBE ID (GET)

http://localhost:8082/api/v1/metrics-csv/:tribeId

#### Response 

Returns a csv file with the metrics information.



