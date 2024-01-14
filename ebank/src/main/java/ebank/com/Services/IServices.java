package ebank.com.Services;

import ebank.com.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;
import java.util.List;

public interface IServices  {

    void deleteReclamation(int id);

    Employes addEmploye(Employes E);

    /*
     //compte
     @Override
     public Compte addcomp(Reclamation R) {return reclamationRepository.save(R);}
     @Override
     public List<Reclamation> getReclamations(){ return reclamationRepository.findAll();}
     @Override
     public Reclamation getReclamationById(int idReclamation) {
         return reclamationRepository.findById(idReclamation).get();
     }
     @Override
     public Reclamation updateReclamation(Reclamation R) {return reclamationRepository.save(R);}
     @Override
     public void deleteReclamation(int id) { reclamationRepository.deleteById(id);}

 */


    //Reclamation
    Reclamation addReclamation(Reclamation R);

    List<Employes> getEmployes();

    List<Reclamation> getReclamations();

    Employes getEmployeById(int idEmploye);

    Employes updateEmploye(Employes E);

    Reclamation getReclamationById(int idReclamation);

    Reclamation updateReclamation(Reclamation R);

    void deleteEmploye(int id);

    Client addClient(Client u);



    List<Client> getClients();

    Client updateClient(Client u);

    void deleteClient(int id);

    Compte ajouterCompteEtAffecterAuClient(Compte compte, int idClient);

    Client getClientById(int idClient);

    //trans
    List<Transaction> getTransactions();


    List<Transaction> getTransactionsByDate(Date date);

    String ajoutervirement(Transaction transaction);

    String ajouterRetrait(Transaction transaction);

    String ajouterVersement(Transaction transaction);



}
