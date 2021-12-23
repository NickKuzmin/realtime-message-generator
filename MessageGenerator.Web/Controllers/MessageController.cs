using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MessageGenerator.Web.Models;
using MessageGenerator.Web.Services;

namespace MessageGenerator.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;

        public MessageController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        [HttpGet]
        public IEnumerable<MessageApiModel> Get()
        {
            return _messageRepository.Get();
        }
    }
}
