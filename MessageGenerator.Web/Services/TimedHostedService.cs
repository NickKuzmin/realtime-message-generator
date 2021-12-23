using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MessageGenerator.Web.Models;
using Microsoft.Extensions.Hosting;

namespace MessageGenerator.Web.Services
{
    public class TimedHostedService : IHostedService, IDisposable
    {
        private Timer _timer;

        private readonly IMessageRepository _messageRepository;

        private static string[] Words = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public TimedHostedService(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(15));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _messageRepository.Add(new MessageApiModel
            {
                Uid = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                Content = string.Join(", ", Enumerable.Range(1, 5).OrderBy(x => Guid.NewGuid()))
            });
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
