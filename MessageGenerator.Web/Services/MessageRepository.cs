using System.Collections.Generic;
using System.Linq;
using MessageGenerator.Web.Models;

namespace MessageGenerator.Web.Services
{
    public interface IMessageRepository
    {
        IEnumerable<MessageApiModel> Get();

        void Add(IEnumerable<MessageApiModel> messages);
    }

    public class MessageRepository : IMessageRepository
    {
        private readonly List<MessageApiModel> _messages;

        public MessageRepository()
        {
            _messages = new List<MessageApiModel>();
        }

        public IEnumerable<MessageApiModel> Get()
        {
            return _messages.OrderByDescending(x => x.CreatedDate);
        }

        public void Add(IEnumerable<MessageApiModel> messages)
        {
            _messages.AddRange(messages);
        }
    }
}
