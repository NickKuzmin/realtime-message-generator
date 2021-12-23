using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using MessageGenerator.Web.Models;
using MessageGenerator.Web.Services;

namespace MessageGenerator.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<MessageController> _logger;
        private readonly IMessageRepository _messageRepository;

        public MessageController(ILogger<MessageController> logger, IMessageRepository messageRepository)
        {
            _logger = logger;
            _messageRepository = messageRepository;
        }

        [HttpGet]
        public IEnumerable<MessageApiModel> Get()
        {
            return _messageRepository.Get();
        }
    }
}
