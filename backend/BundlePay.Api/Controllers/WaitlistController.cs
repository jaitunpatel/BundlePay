using Microsoft.AspNetCore.Mvc;
using Resend;

namespace BundlePay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WaitlistController : ControllerBase
    {
        private readonly IResend _resend;
        private readonly IConfiguration _config;

        public WaitlistController(IResend resend, IConfiguration config)
        {
            _resend = resend;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> JoinWaitlist([FromBody] WaitlistRequest request)
        {
            var email = request.Email?.Trim();

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { message = "Email is required" });

            if (!email.Contains("@") || !email.Contains("."))
                return BadRequest(new { message = "Email is invalid" });

            var toEmail = _config["Waitlist:ToEmail"];
            if (string.IsNullOrWhiteSpace(toEmail))
                return StatusCode(500, new { message = "Waitlist:ToEmail missing" });

            var fromEmail = _config["Waitlist:FromEmail"] ?? "onboarding@resend.dev";

            try
            {
                await _resend.EmailSendAsync(new EmailMessage
                {
                    From = fromEmail,
                    To = toEmail,
                    Subject = "New BundlePay waitlist signup",
                    TextBody = $"New waitlist email: {email}"
                });

                return Ok(new { message = "Added to waitlist" });
            }
            catch
            {
                return StatusCode(500, new { message = "Failed to join waitlist" });
            }
        }
    }

    public record WaitlistRequest(string Email);
}
