using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DesiShop.Controllers.api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        public readonly IWebHostEnvironment _environment;
        public UploadController(
            IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost]
        public async Task<ActionResult> FileUpload()
        {
            await Task.Delay(0);
            _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

            var filePaths = new List<string>();
            if (Request.Form.Files.Count > 0)
            {
                for (int i = 0; i < Request.Form.Files.Count; i++)
                {
                    string BAsePath = _environment.WebRootPath + "/UserFiles/";
                    string UniqueId = Guid.NewGuid().ToString();
                    string FileExtention = Path.GetExtension(Request.Form.Files[i].FileName);

                    string FileCompletePath = BAsePath + UniqueId + FileExtention;


                    using (var FileUploadingStream = new FileStream(FileCompletePath, FileMode.Create))
                    {
                        Request.Form.Files[i].CopyTo(FileUploadingStream);
                    }


                    filePaths.Add("/UserFiles/" + UniqueId + FileExtention);

                }
                return Ok(filePaths);
            }
            else
            {
                return Ok(null);
            }
        }

    }
}
