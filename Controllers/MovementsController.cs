using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Autorizacion.Data;
using Autorizacion.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace aspnetcore_with_reactspa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovementsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public MovementsController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Movements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movement>>> GetMovements()
        {
          if (_context.Movements == null)
          {
              return NotFound();
          }
            return await _context.Movements.OrderByDescending(m => m.MovementId).Take(100).ToListAsync();
        }

        // GET: api/Movements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movement>> GetMovement(int id)
        {
          if (_context.Movements == null)
          {
              return NotFound();
          }
            var movement = await _context.Movements.FindAsync(id);

            if (movement == null)
            {
                return NotFound();
            }

            return movement;
        }

        // PUT: api/Movements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[Authorize(Policy = "grt")]       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovement(int id, Movement movement)
        {
            if (id != movement.MovementId)
            {
                return BadRequest();
            }

            _context.Entry(movement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Movements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
          
       [HttpPost]
        public async Task<ActionResult<Movement>> PostMovement(Movement movement, int pId, int cantidad)
        {
            Console.WriteLine(pId);
            Console.WriteLine(cantidad);

            if (_context.Movements == null)
            {
                return Problem("Entity set 'NorthwindContext.Movements'  is null.");
            }

            Console.WriteLine(movement.Type);
            if (movement.Type.Equals("VENTA"))
            {
                
                    Warehouseproduct wh = await _context.Warehouseproducts
                        .FindAsync(movement.OriginWarehouseId, pId);
                    Console.WriteLine(wh.UnitsInStock);
                    wh.UnitsInStock = (short)(wh.UnitsInStock - cantidad);
                    _context.Entry(wh).State = EntityState.Modified;
                    //await _context.SaveChangesAsync();
                
                
            }
            else if (movement.Type.Equals("COMPRA"))
            {
                Warehouseproduct wh = await _context.Warehouseproducts
                        .FindAsync(movement.OriginWarehouseId, pId);
                Console.WriteLine(wh.UnitsInStock);
                wh.UnitsInStock = (short)(wh.UnitsInStock + cantidad);
                _context.Entry(wh).State = EntityState.Modified;
                //await _context.SaveChangesAsync();
            }
            
            _context.Movements.Add(movement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovement", new { id = movement.MovementId }, movement);
            return NotFound();
        }


       // [Authorize(Policy = "grt")]// DELETE: api/Movements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovement(int id)
        {
            if (_context.Movements == null)
            {
                return NotFound();
            }
            var movement = await _context.Movements.FindAsync(id);
            if (movement == null)
            {
                return NotFound();
            }

            _context.Movements.Remove(movement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovementExists(int id)
        {
            return (_context.Movements?.Any(e => e.MovementId == id)).GetValueOrDefault();
        }
    }
}
