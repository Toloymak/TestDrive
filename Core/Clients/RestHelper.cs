using RestSharp;
using RestSharp.Serialization.Json;

namespace Core.Clients
{
    public class RestHelper
    {
        private IRestClient client;

        private const string Token = "";

        public RestHelper(string uri)
        {
            this.client = new RestClient(uri);
        }

        private RestRequest GetRequest(string uri)
        {
            var request =  new RestRequest(uri, Method.GET);
            request.AddHeader("Authorization", $"Bearer {Token}");
            request.AddHeader("Accept", "application/json");
            return request;
        }

        public TeamCityBuilds<T> ExecuteRequest<T>(string uri)
        {
            var client = this.client;
            var request = GetRequest(uri);
            
            JsonDeserializer deserializer = new JsonDeserializer();
            IRestResponse response = client.Execute(request);

            return deserializer.Deserialize<TeamCityBuilds<T>>(response);
        }

        public string BuildUri(string uri)
        {
            return $"builds/?locator=buildType:{uri},count:1&fields=build(startDate,finishDate,branchName,status,state)";
        }
    }
}