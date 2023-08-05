﻿namespace EW.Services.Email.Models
{
    public class EmailConfiguration
    {
        public required string Mail { get; set; }
        public required string DisplayName { get; set; }
        public required string Password { get; set; }
        public required string Host { get; set; }
        public required int Port { get; set; }
    }
}
