using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class BaseHub: Hub
    {
        protected async Task SendAllClients(string methodName, object message)
        {
            await Clients.All.SendAsync(methodName, message);
        }

        protected async Task SendToCurrentClient(string methodName, object message)
        {
            await Clients.Client(this.Context.ConnectionId).SendAsync(methodName, message);

        }
    }
}