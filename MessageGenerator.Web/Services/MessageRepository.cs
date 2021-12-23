using System.Collections.Generic;
using MessageGenerator.Web.Models;

namespace MessageGenerator.Web.Services
{
    public interface IMessageRepository
    {
        IEnumerable<MessageApiModel> Get();

        void Add(MessageApiModel messageApiModel);
    }

    public class MessageRepository : IMessageRepository
    {
        private readonly IList<MessageApiModel> _messages;

        public MessageRepository()
        {
            _messages = new List<MessageApiModel>();
        }

        public IEnumerable<MessageApiModel> Get()
        {
            return _messages;
        }

        public void Add(MessageApiModel messageApiModel)
        {
            _messages.Add(messageApiModel);
        }
    }
}
