package ebank.com.RestControllers;

import ebank.com.Entity.*;
import ebank.com.Repository.TransactionRepository;
import ebank.com.Services.IServices;
import ebank.com.Services.Services;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@org.springframework.web.bind.annotation.RestController
@RequestMapping("Ebank")
public class RestController {

    @Autowired
    IServices Service;


    //Client
    @Operation(summary = "addClient", description = "addClient")
    @PostMapping("/addClient")
    public Client addClient(@RequestBody Client u) {
        return Service.addClient(u);
    }

    @Operation(summary = "getClients", description = "getClients")
    @GetMapping("/getClients")
    public List<Client> getClients() {
        return Service.getClients();
    }

    @Operation(summary = "getClientById", description = "getClientById")
    @GetMapping("/getClient/{id}")
    public Client getClientById(@PathVariable int id) {
        return Service.getClientById(id);
    }

    @Operation(summary = "modifierClient", description = "modifierClient")
    @PutMapping("/modifierClient")
    public Client updateClient(@RequestBody Client u) {
        return Service.updateClient(u);
    }

    @Operation(summary = "supprimerClient", description = "supprimerClient")
    @DeleteMapping("/supprimerClient/{id}")
    public void deleteClient(@PathVariable int id) {
        Service.deleteClient(id);
    }

    @Operation(summary = "ajouterCompteEtAffecterAuClient", description = "ajouterCompteEtAffecterAuClient")
    @PutMapping("/ajouterCompteEtAffecterAuClient/{c}/{idClient}")
    public Compte ajouterCompteEtAffecterAuClient(@RequestBody Compte c, @PathVariable int idClient) {

        return Service.ajouterCompteEtAffecterAuClient(c, idClient);
    }


    //Employe
    @Operation(summary = "addEmploye", description = "addEmploye")
    @PostMapping("/addEmploye")
    public Employes addEmploye(@RequestBody Employes E) {
        return Service.addEmploye(E);
    }

    @Operation(summary = "getEmployes", description = "getEmployes")
    @GetMapping("/getEmployes")
    public List<Employes> getEmployes() {
        return Service.getEmployes();
    }

    @Operation(summary = "getEmployeById", description = "getEmployeById")
    @GetMapping("/getEmploye/{id}")
    public Employes getEmployeById(@PathVariable int id) {
        return Service.getEmployeById(id);
    }

    @Operation(summary = "modifierEmploye", description = "modifierEmploye")
    @PutMapping("/modifierEmploye")
    public Employes updateEmploye(@RequestBody Employes E) {
        return Service.updateEmploye(E);
    }

    @Operation(summary = "supprimerEmploye", description = "supprimerEmploye")
    @DeleteMapping("/supprimerEmploye/{id}")
    public void deleteEmploye(@PathVariable int id) {
        Service.deleteEmploye(id);
    }

    //transaction
    @Operation(summary = "getTransactions", description = "getTransactions")
    @GetMapping("/getTransactions")
    public List<Transaction> getTransactions() {
        return Service.getTransactions();
    }

    @GetMapping("/by-date")
    public List<Transaction> getTransactionsByDate(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return Service.getTransactionsByDate(date);
    }

    //Virement
    @Operation(summary = "ajouterVirement", description = "ajouterVirement")
    @PutMapping("/ajouterVirement")
    public String ajouterVirement(@RequestBody Transaction transaction) {

        return Service.ajoutervirement(transaction);
    }

    //Retrait
    @Operation(summary = "ajouterRetrait", description = "ajouterRetrait")
    @PutMapping("/ajouterRetrait")
    public String ajouterRetrait(@RequestBody Transaction transaction) {

        return Service.ajouterRetrait(transaction);
    }

    //Versement
    @Operation(summary = "ajouterVersement", description = "ajouterVersement")
    @PutMapping("/ajouterVersement")
    public String ajouterVersement(@RequestBody Transaction transaction) {

        return Service.ajouterVersement(transaction);
    }

    //Reclamation
    @Operation(summary = "addReclamation", description = "addReclamation")
    @PostMapping("/addReclamation")
    public Reclamation addReclamation(@RequestBody Reclamation R) {
        return Service.addReclamation(R);
    }

    @Operation(summary = "getReclamation", description = "getReclamation")
    @GetMapping("/getReclamation")
    public List<Reclamation> getReclamations() {
        return Service.getReclamations();
    }

    @Operation(summary = "getReclamationById", description = "getReclamationById")
    @GetMapping("/getReclamation/{id}")
    public Reclamation getReclamationById(@PathVariable int id) {
        return Service.getReclamationById(id);
    }

    @Operation(summary = "modifierReclamation", description = "modifierReclamation")
    @PutMapping("/modifierReclamation")
    public Reclamation updateReclamation(@RequestBody Reclamation R) {
        return Service.updateReclamation(R);
    }

    @Operation(summary = "supprimerReclamation", description = "supprimerReclamation")
    @DeleteMapping("/supprimerReclamation/{id}")
    public void deleteReclamation(@PathVariable int id) {
        Service.deleteReclamation(id);
    }


}
