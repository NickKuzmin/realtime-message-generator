using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MessageGenerator.Web.Services
{
    public class MessageBackgroundWorker : BackgroundService
    {
        private readonly ILogger<MessageBackgroundWorker> _logger;
        private readonly IHubContext<MessageHub, IMessageHub> _clockHub;
        private readonly IMessageGenerator _messageGenerator;
        private readonly IMessageRepository _messageRepository;

        public MessageBackgroundWorker(ILogger<MessageBackgroundWorker> logger, IHubContext<MessageHub, IMessageHub> clockHub,
            IMessageGenerator messageGenerator, IMessageRepository messageRepository)
        {
            _logger = logger;
            _clockHub = clockHub;
            _messageGenerator = messageGenerator;
            _messageRepository = messageRepository;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {Time}", DateTime.Now);
                var messages = _messageGenerator.GenerateMessages(2);
                _messageRepository.Add(messages);

                await _clockHub.Clients.All.SendMessages(messages);
                await Task.Delay(5000, stoppingToken);
            }
        }
    }
}
