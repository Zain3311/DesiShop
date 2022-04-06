using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Hubs
{
    public class OrderHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
