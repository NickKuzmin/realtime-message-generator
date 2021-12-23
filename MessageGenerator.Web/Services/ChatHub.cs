using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MessageGenerator.Web.Services
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
