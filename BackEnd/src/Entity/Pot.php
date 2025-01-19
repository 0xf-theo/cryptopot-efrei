<?php

namespace App\Entity;

use App\Repository\PotRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PotRepository::class)]
class Pot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_asso = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $target_amount = null;

    #[ORM\Column]
    private ?int $amount_paid = null;

    #[ORM\Column]
    private ?string $description = null;

    #[ORM\Column]
    private ?string $image = null;

    #[ORM\Column(length: 50)]
    private ?string $status = null;

    #[ORM\Column(length: 50)]
    private ?string $contract_address = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getId_asso(): ?int
    {
        return $this->id_asso;
    }

    public function setId_asso(int $id_asso): self
    {
        $this->id_asso = $id_asso;

        return $this;
    }

    public function getContract_address(): ?string
    {
        return $this->contract_address;
    }

    public function setContract_address(string $contract_Address): self
    {
        $this->contract_address = $contract_Address;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getTarget_amount(): ?int
    {
        return $this->target_amount;
    }

    public function setTarget_amount(int $target_amount): self
    {
        $this->target_amount = $target_amount;

        return $this;
    }

    public function getAmount_paid(): ?int
    {
        return $this->amount_paid;
    }

    public function setAmount_paid(int $amount_paid): self
    {
        $this->amount_paid = $amount_paid;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }
}
