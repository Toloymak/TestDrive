using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    using DataLayer.Entities;

    public class BaseHub: Hub
    {
        protected IClientProxy CurrentClient => this.Clients.Client(Context.ConnectionId);
    }
}