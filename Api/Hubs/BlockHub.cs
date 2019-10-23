using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class BlockHub: Hub
    {
        public override Task OnConnectedAsync()
        {
            var links = new List<LinkHubModel>
            {
                new LinkHubModel
                {
                    Id = 0,
                    Url = "http://ya.ru",
                    Service = "TEST",
                    Description = "Описание"
                    

                }
            };
            
            this.Clients.Client(this.Context.ConnectionId).SendAsync("ReceiveMessage", links);
            return base.OnConnectedAsync();
        }
        
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}