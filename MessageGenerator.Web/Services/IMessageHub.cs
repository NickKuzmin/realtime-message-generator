using System.Collections.Generic;
using System.Threading.Tasks;
using MessageGenerator.Web.Models;
using Microsoft.AspNetCore.SignalR;

namespace MessageGenerator.Web.Services
{
    public interface IMessageHub
    {
        Task SendMessages(IEnumerable<MessageApiModel> messages);
    }

    public class MessageHub : Hub<IMessageHub>
    {
        public async Task SendMessages(IEnumerable<MessageApiModel> messages)
        {
            await Clients.All.SendMessages(messages);
        }
    }
}
