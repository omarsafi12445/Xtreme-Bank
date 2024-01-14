package ebank.com.Repository;

import ebank.com.Entity.Employes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployesRepository extends JpaRepository<Employes, Integer> {



}
